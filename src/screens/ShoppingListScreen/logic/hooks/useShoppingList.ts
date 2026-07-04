import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ShoppingItem } from '../../types';

const STORAGE_KEY = 'shopping-list-items';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    async function loadItems() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored) as ShoppingItem[]);
      } catch (error) {
        console.warn('Failed to load shopping list from storage', error);
      } finally {
        hasLoadedRef.current = true;
      }
    }

    loadItems();
  }, []);

  useEffect(() => {
    // Skip persisting until the initial load finishes, otherwise the empty
    // initial state would overwrite whatever was already saved on disk.
    if (!hasLoadedRef.current) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch((error) => {
      console.warn('Failed to save shopping list to storage', error);
    });
  }, [items]);

  const addItem = useCallback((name: string) => {
    setItems((current) => [...current, { id: Date.now().toString(), name }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  return { items, addItem, removeItem };
}
