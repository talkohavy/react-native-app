import { useCallback } from 'react';
import { Alert } from 'react-native';
import BookCard from '../../content/BookCard';
import type { Book } from '@src/store/books';

type UseBookItemProps = {
  deleteBook: (id: string) => void;
  navigation: any;
};

export function useBookItem(props: UseBookItemProps) {
  const { deleteBook, navigation } = props;

  const handleCardPress = useCallback(
    (bookId: string) => {
      navigation.navigate('BookDetail', { bookId });
    },
    [navigation],
  );

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert('Delete Book', 'Are you sure you want to delete this book?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteBook(id) },
      ]);
    },
    [deleteBook],
  );

  const BookItem = useCallback(
    ({ item }: { item: Book }) => {
      const onBookClick = () => handleCardPress(item.id);
      const onDeleteClick = () => handleDelete(item.id);

      return <BookCard book={item} onPress={onBookClick} onDelete={onDeleteClick} />;
    },
    [handleCardPress, handleDelete],
  );

  return BookItem;
}
