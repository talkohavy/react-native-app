import { useRoute } from '@react-navigation/native';
import { useBooksStore } from '@src/store/books';
import type { BookDetailRouteProp } from '../../types';

export function useFetchBookById() {
  const route = useRoute<BookDetailRouteProp>();

  const { bookId } = route.params;

  const { books } = useBooksStore();

  const book = books.find((b) => b.id === bookId) ?? null;

  return { data: book };
}
