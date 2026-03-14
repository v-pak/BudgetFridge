type FridgeItemProps = {
    index: number;
    name: string;
    qty: string;
    onRemove: (index: number) => void;
};

export function FridgeItem({ index, name, qty, onRemove }: FridgeItemProps) {
    return (
        <li className="flex justify-between items-center py-[14px] border-b border-border text-[14px]">
            <span className="text-[11px] text-text-light font-light w-7 shrink-0">
                {String(index + 1).padStart(2, '0')}.
            </span>
            <span className="flex-1 text-text">{name}</span>
            <span className="text-[13px] text-text-light font-light">{qty}</span>
            <button
                className="text-[16px] text-text-light opacity-50 ml-3 hover:opacity-100 hover:text-accent transition-opacity cursor-pointer"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${name}`}
            >
                ×
            </button>
        </li>
    );
}