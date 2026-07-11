import { useWindowDimensions } from 'react-native';
import { useBooksStore } from '@src/store/books';
import { useBookItem } from './hooks/useBookItem';
import { useCreateBookModal } from './hooks/useCreateBookModal';

export function useBooksScreenLogic() {
  const { books } = useBooksStore();

  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const columnsCount = isLandscape ? 4 : 2;

  const BookItem = useBookItem();
  const { isModalVisible, openModal, closeModal, handleAdd } = useCreateBookModal();

  return {
    books,
    columnsCount,
    BookItem,
    isModalVisible,
    openModal,
    closeModal,
    handleAdd,
  };
}
