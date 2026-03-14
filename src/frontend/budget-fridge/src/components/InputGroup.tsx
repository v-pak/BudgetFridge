import { InputElement } from "./InputElement";

interface InputGroupProps {
    ingredient: string;
    setIngredient: (value: string) => void;
    amount: string;
    setAmount: (value: string) => void;
    onAdd: () => void;
}

export function InputGroup({ ingredient, setIngredient, amount, setAmount, onAdd }: InputGroupProps) {

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') onAdd();
    }

    return (
        <div className="w-full max-w-[420px] mb-3">
            <div className="flex gap-3 items-center">
                <InputElement
                    className="flex-1 font-body text-[15px] px-5 py-[14px] border border-border rounded-[12px] bg-bg text-text placeholder:text-text-light placeholder:opacity-60 outline-none focus:border-accent transition-colors duration-300"
                    type="text"
                    placeholder="Garlic"
                    val={ingredient}
                    setVal={setIngredient}
                    onKeyDown={handleKeyDown}
                />
                <InputElement
                    className="w-[120px] font-body text-[15px] px-5 py-[14px] border border-border rounded-[12px] bg-bg text-text placeholder:text-text-light placeholder:opacity-60 outline-none focus:border-accent transition-colors duration-300"
                    type="text"
                    placeholder="15 Cloves"
                    val={amount}
                    setVal={setAmount}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <p className="text-[12px] text-text-light mt-2 italic">press enter to add to your list</p>
        </div>
    );
}