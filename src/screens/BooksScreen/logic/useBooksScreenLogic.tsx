import { useWindowDimensions } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useBooksStore } from '@src/store/books';
import { useBookItem } from './hooks/useBookItem';
import { useCreateBookModal } from './hooks/useCreateBookModal';

export function useBooksScreenLogic() {
  const { books, deleteBook } = useBooksStore();
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const columnsCount = isLandscape ? 4 : 2;

  const BookItem = useBookItem({ deleteBook, navigation });
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
