import { useCallback, useState } from 'react';
import { useBooksStore, type Book } from '@src/store/books';

export function useCreateBookModal() {
  const { addBook } = useBooksStore();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);

  const handleAdd = useCallback(
    (bookData: Omit<Book, 'id'>) => {
      addBook(bookData);
      closeModal();
    },
    [addBook, closeModal],
  );

  return { isModalVisible, openModal, closeModal, handleAdd };
}
