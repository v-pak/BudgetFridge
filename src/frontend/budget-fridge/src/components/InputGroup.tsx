import { InputElement } from "./InputElement";

export interface InputProps {
    ingredient: string;
    setIngredient: (value: string) => void;
    amount: string;
    setAmount: (value: string) => void;
    unit: string;
    setUnit: (value: string) => void;
}

export function InputGroup({ ingredient, setIngredient, amount, setAmount, unit, setUnit }: InputProps) {
    return (
        <div className="input-group">
            <div className="input-row">
                <InputElement
                    className="input-ingredient"
                    type="text"
                    placeholder="input ingredient..."
                    val={ingredient}
                    setVal={setIngredient}
                />
                <InputElement
                    className="input-amount"
                    type="number"
                    placeholder="0"
                    val={amount}
                    setVal={setAmount}
                />
                <InputElement
                    className="input-unit"
                    type="text"
                    placeholder=""
                    val={unit}
                    setVal={setUnit}
                />
            </div>
            <div className="input-hint">press enter to add to your list</div>
        </div>
    )
}