import { useState } from 'react';
import './index.css';
import LeftPanel from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function Layout() {
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');

  return (
    <>

      <div>
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
          <Route path="/" />
          <Route path="/loading" />
          <Route path="/recipe" />
          <Route path="/my-recipes" />
        </Routes>
      </BrowserRouter>
    </>
  )
}