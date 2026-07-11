import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useBooksStore } from '@src/store/books';

type BookDetailRouteProp = RouteProp<{ BookDetail: { bookId: string } }, 'BookDetail'>;

export function useBookDetailScreenLogic() {
  const route = useRoute<BookDetailRouteProp>();
  const navigation = useNavigation();
  const { bookId } = route.params;

  const { books, deleteBook } = useBooksStore();
  const book = books.find((b) => b.id === bookId) ?? null;

  const handleItemDelete = useCallback(() => {
    deleteBook(bookId);
    navigation.goBack();
  }, [bookId, deleteBook, navigation]);

  const onDeleteClick = useCallback(() => {
    Alert.alert('Delete Book', 'Are you sure you want to delete this book?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: handleItemDelete,
      },
    ]);
  }, [bookId, deleteBook, navigation]);

  return { book, onDeleteClick };
}
