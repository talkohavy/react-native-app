import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBooksStore } from '@src/store/books';

type UseDeleteBookByIdProps = {
  bookId: string;
};

export function useDeleteBookById(props: UseDeleteBookByIdProps) {
  const { bookId } = props;

  const navigation = useNavigation();

  const { deleteBook } = useBooksStore();

  const handleItemDelete = useCallback(() => {
    if (!bookId) return;

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
  }, [handleItemDelete]);

  return { onDeleteClick };
}
