import { InputGroup, type InputProps } from "./InputGroup";


export default function LeftPanel({ ingredient, setIngredient, amount, setAmount, unit, setUnit }: InputProps) {


    return (
        <div className="panel-left">
            <div className="landing-title">What's in<br />your fridge?</div>
            <div className="landing-subtitle">cook something beautiful</div>

            <InputGroup
                ingredient={ingredient}
                setIngredient={setIngredient}
                amount={amount}
                setAmount={setAmount}
                unit={unit}
                setUnit={setUnit}
            />

            <span className="decorative-text">budget / fridge / 2024</span>
        </div>
    )
}