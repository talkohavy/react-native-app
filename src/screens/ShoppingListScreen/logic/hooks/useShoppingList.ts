import { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInitialLoadFromStorageShoppingList } from './useInitialLoadFromStorageShoppingList';
import type { ShoppingItem } from '../../types';

const STORAGE_KEY = 'shopping-list-items';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const hasLoadedRef = useRef(false);

  useInitialLoadFromStorageShoppingList({ setItems, hasLoadedRef });

  const addItem = useCallback((name: string) => {
    setItems((prevItems) => {
      const newItem = { id: Date.now().toString(), name };

      const updatedItemsList = [...prevItems, newItem];

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItemsList));

      return updatedItemsList;
    });
  }, []);

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const updatedItemsList = prevItems.filter((item) => item.id !== id);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItemsList));

      return updatedItemsList;
    });
  };

  const handleRemove = (id: string) => {
    const title = 'Remove item';
    const description = 'Remove this item from your list?';

    Alert.alert(title, description, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeItem(id),
      },
    ]);
  };

  return { items, addItem, handleRemove };
}
