import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import LeftPanel from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('grams');




  return (
    <>
      <Navbar />

      <div className="layout">
        <LeftPanel
          ingredient={ingredient}
          setIngredient={setIngredient}
          amount={amount}
          setAmount={setAmount}
          unit={unit}
          setUnit={setUnit}
        />

        <RightPanel />

      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' />
          <Route path='loading' />
          <Route path='recipe' />
          <Route path='my-recipes' />
        </Routes>
      </BrowserRouter>
    </>
  );
}