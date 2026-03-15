import type { FridgeItem } from '../../utils/types';
import { FridgeItemComponent } from './FridgeItem';

type FridgeItemsListProps = {
  items: FridgeItem[];
  selectedIndices: Set<number>;
  onToggle: (index: number) => void;
  onRemove: (index: number) => void;
};

export function FridgeItemsList({ items, selectedIndices, onToggle, onRemove }: FridgeItemsListProps) {
  return (
    <ul className="w-full max-w-[360px]">
      {items.map((item, index) => (
        <FridgeItemComponent
          key={index}
          index={index}
          name={item.name}
          qty={item.quantity}
          selected={selectedIndices.has(index)}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}