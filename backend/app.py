import os
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")
import random
import re
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

from config import Config
from models import Customer, Reservation, db

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app)  # allow the React dev server / static build to call this API

    with app.app_context():
        db.create_all()

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    # ------------------------------------------------------------------
    # FR-6 .. FR-9, FR-17, FR-18: reservation form + assignment logic
    # ------------------------------------------------------------------
    @app.post("/api/reservations")
    def create_reservation():
        data = request.get_json(silent=True) or {}

        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip().lower()
        phone = (data.get("phone") or "").strip() or None
        guests = data.get("guests")
        time_slot_raw = (data.get("time_slot") or "").strip()

        # --- validation -------------------------------------------------
        if not name:
            return jsonify({"error": "Please enter a name for the reservation."}), 400
        if not email or not EMAIL_RE.match(email):
            return jsonify({"error": "Please enter a valid email address."}), 400
        try:
            guests = int(guests)
            if guests <= 0:
                raise ValueError
        except (TypeError, ValueError):
            return jsonify({"error": "Please enter a valid number of guests."}), 400
        try:
            time_slot = datetime.fromisoformat(time_slot_raw)
        except ValueError:
            return jsonify({"error": "Please choose a valid date and time."}), 400
        if time_slot < datetime.now():
            return jsonify({"error": "Please choose a time slot in the future."}), 400

        # --- find or create the customer record (FR-18: insert customer) -
        customer = Customer.query.filter_by(email=email).first()
        if customer is None:
            customer = Customer(customer_name=name, email=email, phone_number=phone)
            db.session.add(customer)
            db.session.flush()
        else:
            customer.customer_name = name
            customer.phone_number = phone or customer.phone_number

        # --- check availability for this time slot (FR-7, NFR-5) --------
        booked_tables = {
            r.table_number
            for r in Reservation.query.filter_by(time_slot=time_slot).all()
        }
        available_tables = [
            t for t in range(1, Config.TOTAL_TABLES + 1) if t not in booked_tables
        ]

        if not available_tables:
            db.session.rollback()
            return (
                jsonify(
                    {
                        "error": (
                            "Sorry, that time slot is fully booked. "
                            "Please choose another time."
                        )
                    }
                ),
                409,
            )

        # --- assign a random available table (FR-8) ----------------------
        table_number = random.choice(available_tables)
        reservation = Reservation(
            customer_id=customer.customer_id,
            time_slot=time_slot,
            table_number=table_number,
            guests=guests,
        )
        db.session.add(reservation)

        try:
            db.session.commit()
        except IntegrityError:
            # Extremely rare race condition: another request took this
            # exact table/time-slot combination between our check and our
            # commit. Ask the customer to retry rather than double-book.
            db.session.rollback()
            return (
                jsonify({"error": "That table was just booked. Please try again."}),
                409,
            )

        return (
            jsonify(
                {
                    "message": "Reservation confirmed!",
                    "table_number": table_number,
                    "time_slot": time_slot.isoformat(),
                    "guests": guests,
                }
            ),
            201,
        )

    # ------------------------------------------------------------------
    # FR-15, FR-16: newsletter signup
    # ------------------------------------------------------------------
    @app.post("/api/newsletter")
    def newsletter_signup():
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()

        if not email or not EMAIL_RE.match(email):
            return jsonify({"error": "Please enter a valid email address."}), 400

        customer = Customer.query.filter_by(email=email).first()
        if customer is None:
            customer = Customer(email=email, newsletter_signup=True)
            db.session.add(customer)
        else:
            customer.newsletter_signup = True

        db.session.commit()
        return jsonify({"message": "You're subscribed to the Café Fausse newsletter."}), 201

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
