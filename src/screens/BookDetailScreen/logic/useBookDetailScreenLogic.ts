import { useDeleteBookById } from './hooks/useDeleteBookById';
import { useFetchBookById } from './hooks/useFetchBookById';

export function useBookDetailScreenLogic() {
  const { data: book } = useFetchBookById();

  const { onDeleteClick } = useDeleteBookById({ bookId: book?.id ?? '' });

  return { book, onDeleteClick };
}
