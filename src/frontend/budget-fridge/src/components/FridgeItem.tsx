type FridgeItemProps = {
    index: number;
    name: string;
    qty: string;
};

export function FridgeItem({ index, name, qty }: FridgeItemProps) {
    return (
        <li className="ingredient-item">
            <span className="ingredient-number">
                {String(index + 1).padStart(2, '0')}.
            </span>
            <span className="ingredient-name">{name}</span>
            <span className="ingredient-qty">{qty}</span>
            <span className="ingredient-remove">×</span>
        </li>
    );
}