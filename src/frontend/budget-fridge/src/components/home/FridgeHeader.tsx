interface FridgeHeaderProps {
  showCheckbox: boolean;
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
}

export default function FridgeHeader({ showCheckbox, allSelected, someSelected, onToggleAll }: FridgeHeaderProps) {
  return (
    <div className="flex items-center gap-3 w-full max-w-[360px] mb-8">
      {showCheckbox && (
        <button
          onClick={onToggleAll}
          aria-label={allSelected ? 'Deselect all' : 'Select all'}
          className={`
            shrink-0 w-4 h-4 rounded-[4px] border
            flex items-center justify-center
            transition-colors duration-150 cursor-pointer
            ${allSelected
              ? 'bg-accent border-accent'
              : someSelected
                ? 'bg-accent/40 border-accent'
                : 'bg-transparent border-border hover:border-text-light'
            }
          `}
        >
          {allSelected && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3L3.5 5.5L8 1" stroke="#FAFAF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {someSelected && !allSelected && (
            <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
              <path d="M1 1H7" stroke="#FAFAF7" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      )}

      <div className="flex items-center gap-3 flex-1 font-heading text-[28px] font-medium text-text">
        Your Fridge
        <span className="flex-1 h-px bg-accent opacity-40" />
      </div>
    </div>
  );
}