import { useState } from 'react';
import { InputGroup } from "./InputGroup";

type LeftPanelProps = {
    onAdd: (name: string, qty: string) => void;
};

export default function LeftPanel({ onAdd }: LeftPanelProps) {
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');

    function handleAdd() {
        if (!ingredient.trim()) return;
        onAdd(ingredient, amount);
        setIngredient('');
        setAmount('');
    }

    return (
        <div className="flex flex-col justify-center items-center text-center px-[60px] py-[80px]">
            <h1 className="font-heading text-[72px] font-bold leading-[0.95] tracking-[-1px] text-text mb-3 py-8">
                What's in<br />your fridge?
            </h1>

            <InputGroup
                ingredient={ingredient}
                setIngredient={setIngredient}
                amount={amount}
                setAmount={setAmount}
                onAdd={handleAdd}
            />
        </div>
    );
}