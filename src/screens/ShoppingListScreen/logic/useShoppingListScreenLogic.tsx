import { useCallback } from 'react';
import ShoppingListItem from '../content/ShoppingListItem';
import { useShoppingList } from './hooks/useShoppingList';
import type { ShoppingItem } from '../types';

export function useShoppingListScreenLogic() {
  const { items, addItem, handleRemove } = useShoppingList();

  const renderItem = useCallback((props: { item: ShoppingItem }) => {
    const { item } = props;

    return <ShoppingListItem item={item} onRemove={handleRemove} />;
  }, []);

  return { items, addItem, renderItem };
}
