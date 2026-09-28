import os


class Config:
    """
    Reads DB connection info from environment variables so credentials never
    live in source control. Set these before running the app, e.g.:

        export DATABASE_URL="postgresql://user:password@localhost:5432/cafe_fausse"
    """
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/cafe_fausse",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TOTAL_TABLES = 30
