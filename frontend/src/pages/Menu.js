import React from "react";

const MENU = [
  {
    category: "Starters",
    items: [
      { name: "Bruschetta", desc: "Fresh tomatoes, basil, olive oil, and toasted baguette slices", price: "$8.50" },
      { name: "Caesar Salad", desc: "Crisp romaine with homemade Caesar dressing", price: "$9.00" },
    ],
  },
  {
    category: "Main Courses",
    items: [
      { name: "Grilled Salmon", desc: "Served with lemon butter sauce and seasonal vegetables", price: "$22.00" },
      { name: "Ribeye Steak", desc: "12 oz prime cut with garlic mashed potatoes", price: "$28.00" },
      { name: "Vegetable Risotto", desc: "Creamy Arborio rice with wild mushrooms", price: "$18.00" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Tiramisu", desc: "Classic Italian dessert with mascarpone", price: "$7.50" },
      { name: "Cheesecake", desc: "Creamy cheesecake with berry compote", price: "$7.00" },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Red Wine (Glass)", desc: "A selection of Italian reds", price: "$10.00" },
      { name: "White Wine (Glass)", desc: "Crisp and refreshing", price: "$9.00" },
      { name: "Craft Beer", desc: "Local artisan brews", price: "$6.00" },
      { name: "Espresso", desc: "Strong and aromatic", price: "$3.00" },
    ],
  },
];

export default function Menu() {
  return (
    <section className="section page-header">
      <p className="hero__eyebrow">Menu</p>
      <h1>What we're serving</h1>
      <p className="page-header__lede">
        A short, seasonal menu — every dish made to order.
      </p>

      <div className="menu">
        {MENU.map((group) => (
          <div className="menu__group" key={group.category}>
            <h2 className="menu__category">{group.category}</h2>
            <ul className="menu__list">
              {group.items.map((item) => (
                <li className="menu__item" key={item.name}>
                  <div className="menu__item-row">
                    <span className="menu__item-name">{item.name}</span>
                    <span className="menu__item-rule" aria-hidden="true" />
                    <span className="menu__item-price">{item.price}</span>
                  </div>
                  <p className="menu__item-desc">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
