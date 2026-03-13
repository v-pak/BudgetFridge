import { useState } from 'react';
import './index.css';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('grams');

  const placeholderItems = [
    { name: 'Chicken thighs', qty: '500g' },
    { name: 'Jasmine rice', qty: '2 cups' },
    { name: 'Broccoli', qty: '1 head' },
  ];

  return (
    <>
      <nav className="navbar">
        <span className="navbar-logo">BudgetFridge</span>
        <button className="navbar-btn">My Recipes</button>
      </nav>

      <div className="layout">
        <div className="panel-left">
          <div className="landing-title">What's in<br />your fridge?</div>
          <div className="landing-subtitle">cook something beautiful</div>

          <div className="input-group">
            <div className="input-row">
              <input
                className="input-ingredient"
                type="text"
                placeholder="add an ingredient…"
                value={ingredient}
                onChange={e => setIngredient(e.target.value)}
              />
              <input
                className="input-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min="0"
              />
              <select
                className="input-unit"
                value={unit}
                onChange={e => setUnit(e.target.value)}
              >
                <option>grams</option>
                <option>ml</option>
                <option>cups</option>
                <option>tbsp</option>
                <option>tsp</option>
                <option>oz</option>
                <option>units</option>
              </select>
            </div>
            <div className="input-hint">press enter to add to your list</div>
          </div>

          <span className="decorative-text">budget / fridge / 2024</span>
        </div>

        <div className="panel-right">
          <div className="fridge-header">
            Your Fridge
            <span className="fridge-header-line" />
          </div>

          <ul className="ingredient-list">
            {placeholderItems.map((item, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-number">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span className="ingredient-name">{item.name}</span>
                <span className="ingredient-qty">{item.qty}</span>
                <span className="ingredient-remove"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}