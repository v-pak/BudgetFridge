import { useState } from 'react';
import { InputGroup } from "./InputGroup";
import { useRecipe } from '../../context/RecipeContext';
import wok from '../../assets/wok.svg';

export default function LeftPanel() {
  const { addIngredient } = useRecipe();
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');

  function handleAdd() {
    if (!ingredient.trim()) return;
    addIngredient({ name: ingredient.trim(), quantity: amount.trim() });
    setIngredient('');
    setAmount('');
  }

  return (
    <div className="flex flex-col justify-center items-center text-center px-[60px] py-[80px]">
      <img src={wok} alt="wok" width={325} height={325} className="-mb-4" />
      <h1 className="font-heading text-[64px] font-bold leading-[0.95] tracking-[-1px] text-text mb-4 pt-0 pb-4">
        What's in<br />your fridge?
      </h1>
      <InputGroup
        ingredient={ingredient}
        setIngredient={setIngredient}
        amount={amount}
        setAmount={setAmount}
        onAdd={handleAdd}
      />
      <span className="absolute left-5 bottom-10 writing-mode-vertical font-heading text-sm text-accent opacity-30 tracking-widest">
        budget / fridge / 2026
      </span>
    </div>
  );
}