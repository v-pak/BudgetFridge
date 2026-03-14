import { useState } from 'react';
import { InputGroup } from "./InputGroup";
import { useRecipe } from '../hooks/useRecipe';

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
            <h1 className="font-heading text-[72px] font-bold leading-[0.95] tracking-[-1px] text-text mb-3">
                What's in<br />your fridge?
            </h1>
            <p className="font-heading text-[28px] font-normal text-text-light mb-12">
                cook something beautiful
            </p>
            <InputGroup
                ingredient={ingredient}
                setIngredient={setIngredient}
                amount={amount}
                setAmount={setAmount}
                onAdd={handleAdd}
            />
            <span className="absolute left-5 bottom-10 writing-mode-vertical font-heading text-sm text-accent opacity-30 tracking-widest">
                budget / fridge / 2024
            </span>
        </div>
    );
}