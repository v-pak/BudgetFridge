import { useState } from 'react';

type Item = { name: string; qty: string };

export function useFridgeItems() {
  const [items, setItems] = useState<Item[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('fridgeItems') ?? '[]');
    } catch {
      return [];
    }
  });

  function addItem(name: string, qty: string) {
    if (!name.trim()) return;
    const next = [...items, { name: name.trim(), qty: qty.trim() }];
    setItems(next);
    localStorage.setItem('fridgeItems', JSON.stringify(next));
  }

  function removeItem(index: number) {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    localStorage.setItem('fridgeItems', JSON.stringify(next));
  }

  return { items, addItem, removeItem };
}