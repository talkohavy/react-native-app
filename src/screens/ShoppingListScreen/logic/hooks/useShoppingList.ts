import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseJson } from '@src/common/utils/parseJson';
import type { ShoppingItem } from '../../types';

const STORAGE_KEY = 'shopping-list-items';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    async function loadItemsFromStorage() {
      try {
        const storedItemsList = await AsyncStorage.getItem(STORAGE_KEY);

        if (!storedItemsList) return;

        const parsedItemsList = parseJson(storedItemsList) as ShoppingItem[];

        if (!parsedItemsList) return;

        setItems(parsedItemsList);
      } catch (error) {
        console.warn('Failed to load shopping list from storage', error);
      } finally {
        hasLoadedRef.current = true;
      }
    }

    loadItemsFromStorage();
  }, []);

  const addItem = useCallback((name: string) => {
    setItems((prevItems) => {
      const newItem = { id: Date.now().toString(), name };

      const updatedItemsList = [...prevItems, newItem];

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItemsList));

      return updatedItemsList;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => {
      const updatedItemsList = prevItems.filter((item) => item.id !== id);

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItemsList));

      return updatedItemsList;
    });
  }, []);

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
