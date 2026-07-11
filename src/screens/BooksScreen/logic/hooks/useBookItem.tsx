import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { useBooksStore, type Book } from '@src/store/books';
import BookCard from '../../content/BookCard';

export function useBookItem() {
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();

  const { deleteBook } = useBooksStore();

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
