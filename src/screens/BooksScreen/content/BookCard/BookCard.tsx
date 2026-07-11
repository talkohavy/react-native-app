import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import type { Book } from '@src/store/books';

type BookCardProps = {
  book: Book;
  onPress: () => void;
  onDelete: () => void;
};

export default function BookCard(props: BookCardProps) {
  const { book, onPress, onDelete } = props;

  const cardStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.card, pressed && styles.cardPressed],
    [],
  );

  const deleteStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.deleteButton, pressed && styles.deleteButtonPressed],
    [],
  );

  return (
    <Pressable onPress={onPress} style={cardStyle}>
      <View style={styles.cover}>
        <Text style={styles.coverEmoji}>📚</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>

        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
      </View>

      <Pressable onPress={onDelete} style={deleteStyle} hitSlop={8}>
        <Text style={styles.deleteIcon}>🗑</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Theme.light.colors.base_0,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_10,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.7,
  },
  cover: {
    backgroundColor: Theme.light.colors.base_10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
  },
  coverEmoji: {
    fontSize: Theme.fontSizes.xl_4,
  },
  info: {
    padding: Theme.spacing.sm,
    gap: 2,
  },
  title: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '700',
    color: Theme.light.colors.base_100,
  },
  author: {
    fontSize: Theme.fontSizes.xs,
    color: Theme.light.colors.base_60,
  },
  deleteButton: {
    position: 'absolute',
    top: Theme.spacing.xs,
    right: Theme.spacing.xs,
    width: 26,
    height: 26,
    borderRadius: Theme.borderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonPressed: {
    backgroundColor: Theme.light.colors.base_20,
  },
  deleteIcon: {
    fontSize: 13,
  },
});
