import { useCallback, useRef, useState } from 'react';
import { Alert, type TextInput } from 'react-native';
import type { Book } from '@src/store/books';

type UseAddBookModalLogicProps = {
  onAdd: (book: Omit<Book, 'id'>) => void;
  onClose: () => void;
};

export function useAddBookModalLogic(props: UseAddBookModalLogicProps) {
  const { onAdd, onClose } = props;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const authorRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const reset = useCallback(() => {
    setTitle('');
    setAuthor('');
    setDescription('');
  }, []);

  const handleAdd = () => {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedTitle) {
      Alert.alert('Missing field', 'Please enter a title.');
      return;
    }

    if (!trimmedAuthor) {
      Alert.alert('Missing field', 'Please enter an author.');
      return;
    }

    onAdd({
      title: trimmedTitle,
      author: trimmedAuthor,
      description: description.trim() || undefined,
    });

    reset();
  };

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  return {
    authorRef,
    descriptionRef,
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    handleAdd,
    handleClose,
  };
}
