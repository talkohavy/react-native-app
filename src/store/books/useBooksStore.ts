import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AsyncStorageKeys } from '@src/common/constants';
import type { BooksState } from './types';

export const useBooksStore = create<BooksState>()(
  persist(
    (set) => ({
      books: [],
      addBook: (bookData) =>
        set((state) => ({
          books: [...state.books, { ...bookData, id: Date.now().toString() }],
        })),
      deleteBook: (id) =>
        set((state) => ({
          books: state.books.filter((b) => b.id !== id),
        })),
    }),
    {
      name: AsyncStorageKeys.Books,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
