interface InputElementData {
  className: string;
  type: string;
  placeholder: string;
  val: string;
  setVal: (arg0: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function InputElement({ className, type, placeholder, val, setVal, onKeyDown }: InputElementData) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={val}
      onChange={e => setVal(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}