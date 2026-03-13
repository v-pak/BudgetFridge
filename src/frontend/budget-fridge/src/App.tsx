import { useState } from 'react';
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('grams');

  return (
    <>
      <section id="center">
        <div>
          <h1>BudgetFridge</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Add an ingredient"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="0"
          />
          <select value={unit} onChange={e => setUnit(e.target.value)}>
            <option>grams</option>
            <option>ml</option>
            <option>cups</option>
            <option>tbsp</option>
            <option>tsp</option>
            <option>oz</option>
            <option>units</option>
          </select>
        </div>
      </section>
    </>
  )
}

export default App
