import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import { useBookDetailScreenLogic } from './logic/useBookDetailScreenLogic';

export default function BookDetailScreen() {
  const { book, onDeleteClick } = useBookDetailScreenLogic();

  const deleteButtonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.deleteButton, pressed && styles.deleteButtonPressed],
    [],
  );

  if (!book) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundEmoji}>🔍</Text>
        <Text style={styles.notFoundText}>Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.coverSection}>
        <Text style={styles.coverEmoji}>📚</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>

        {book.description ? (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>{book.description}</Text>
          </View>
        ) : null}
      </View>

      <Pressable onPress={onDeleteClick} style={deleteButtonStyle}>
        <Text style={styles.deleteButtonIcon}>🗑</Text>
        <Text style={styles.deleteButtonText}>Delete Book</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.light.colors.base_0,
  },
  content: {
    flexGrow: 1,
    padding: Theme.spacing.lg,
    gap: Theme.spacing.lg,
  },
  coverSection: {
    alignItems: 'center',
    backgroundColor: Theme.light.colors.base_10,
    borderRadius: Theme.borderRadius.lg,
    paddingVertical: Theme.spacing.xl,
  },
  coverEmoji: {
    fontSize: Theme.fontSizes.xl_10,
  },
  details: {
    gap: Theme.spacing.sm,
  },
  title: {
    fontSize: Theme.fontSizes.xl_2,
    fontWeight: '700',
    color: Theme.light.colors.base_100,
  },
  author: {
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_60,
    fontStyle: 'italic',
  },
  descriptionSection: {
    gap: Theme.spacing.xs,
    marginTop: Theme.spacing.sm,
  },
  sectionLabel: {
    fontSize: Theme.fontSizes.xs,
    fontWeight: '700',
    color: Theme.light.colors.base_50,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_80,
    lineHeight: 22,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.sm,
    marginTop: 'auto',
    backgroundColor: '#EF4444',
    borderRadius: Theme.borderRadius.sm,
    paddingVertical: Theme.spacing.md,
  },
  deleteButtonPressed: {
    opacity: 0.8,
  },
  deleteButtonIcon: {
    fontSize: Theme.fontSizes.md,
  },
  deleteButtonText: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.sm,
  },
  notFoundEmoji: {
    fontSize: Theme.fontSizes.xl_6,
  },
  notFoundText: {
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_50,
  },
});
