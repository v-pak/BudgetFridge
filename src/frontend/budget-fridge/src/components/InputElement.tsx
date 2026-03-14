interface InputElementData {
    className: string;
    type: string;
    placeholder: string;
    val: string;
    setVal: (arg0: string) => void;
}

export function InputElement({ className, type, placeholder, val, setVal }: InputElementData) {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            value={val}
            onChange={e => setVal(e.target.value)}
        />
    )
}