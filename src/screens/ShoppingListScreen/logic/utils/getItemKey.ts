import type { ShoppingItem } from '../../types';

export function getItemKey(item: ShoppingItem) {
  return item.id;
}
