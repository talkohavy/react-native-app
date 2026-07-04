import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKeys } from '@src/common/constants';
import { parseJson } from '@src/common/utils/parseJson';
import type { ShoppingItem } from '../../types';

type UseInitialLoadFromStorageShoppingListProps = {
  setItems: (items: ShoppingItem[]) => void;
  hasLoadedRef: React.RefObject<boolean>;
};

export function useInitialLoadFromStorageShoppingList(props: UseInitialLoadFromStorageShoppingListProps) {
  const { setItems, hasLoadedRef } = props;

  useEffect(() => {
    async function loadItemsFromStorage() {
      try {
        const storedItemsList = await AsyncStorage.getItem(AsyncStorageKeys.ShoppingList);

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

  return null;
}
