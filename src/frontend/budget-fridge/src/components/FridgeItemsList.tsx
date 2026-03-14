import { FridgeItem } from './FridgeItem';

type Item = { name: string; qty: string };

type FridgeItemsListProps = {
    items: Item[];
    onRemove: (index: number) => void;
};

export function FridgeItemsList({ items, onRemove }: FridgeItemsListProps) {
    return (
        <ul className="w-full max-w-[360px]">
            {items.map((item, index) => (
                <FridgeItem
                    key={index}
                    index={index}
                    name={item.name}
                    qty={item.qty}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
}