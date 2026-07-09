import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AsyncStorageKeys } from '@src/common/constants';

export const favoriteColorOptions = ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#C084FC'] as const;

export type CounterState = {
  count: number;
  favoriteColor: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setFavoriteColor: (color: string) => void;
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      favoriteColor: favoriteColorOptions[0],
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0, favoriteColor: favoriteColorOptions[0] }),
      setFavoriteColor: (color) => set({ favoriteColor: color }),
    }),
    {
      name: AsyncStorageKeys.ZustandCounter,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
