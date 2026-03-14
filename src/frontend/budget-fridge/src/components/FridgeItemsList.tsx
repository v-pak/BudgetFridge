import type { FridgeItem } from '../utils/types';
import { FridgeItemComponent } from './FridgeItem';


type FridgeItemsListProps = {
  items: FridgeItem[];
  onRemove: (index: number) => void;
};

export function FridgeItemsList({ items, onRemove }: FridgeItemsListProps) {
  return (
    <ul className="w-full max-w-[360px]">
      {items.map((item, index) => (
        <FridgeItemComponent
          key={index}
          index={index}
          name={item.name}
          qty={item.quantity}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}