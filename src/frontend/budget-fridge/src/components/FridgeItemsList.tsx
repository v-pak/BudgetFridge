import { FridgeItem } from './FridgeItem';

type Item = {
    name: string;
    qty: string;
};

export function FridgeItemsList({ items }: { items: Item[] }) {
    return (
        <ul className="ingredient-list">
            {items.map((item, index) => (
                <FridgeItem
                    key={index}
                    index={index}
                    name={item.name}
                    qty={item.qty}
                />
            ))}
        </ul>
    );
}