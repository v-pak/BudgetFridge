type CheckboxProps = {
  index: number;
  name: string;
  selected: boolean;
  onToggle: (index: number) => void;
}

export function Checkbox({ index, name, selected, onToggle }: CheckboxProps) {
  return (
    <button
      onClick={() => onToggle(index)}
      aria-label={`${selected ? 'Deselect' : 'Select'} ${name}`}
      className={`
          shrink-0 w-4 h-4 rounded-[4px] border mr-3
          flex items-center justify-center
          transition-colors duration-150 cursor-pointer
          ${selected
          ? 'bg-accent border-accent'
          : 'bg-transparent border-border hover:border-text-light'
        }
        `}
    >
      {selected && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3L3.5 5.5L8 1" stroke="#FAFAF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}