import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';

export default function BooksEmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📚</Text>
      <Text style={styles.title}>No books yet</Text>
      <Text style={styles.subtitle}>Tap "Add Book" to get started</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Theme.spacing.xl * 2,
    gap: Theme.spacing.sm,
  },
  emoji: {
    fontSize: Theme.fontSizes.xl_8,
  },
  title: {
    fontSize: Theme.fontSizes.lg,
    fontWeight: '600',
    color: Theme.light.colors.base_70,
  },
  subtitle: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.light.colors.base_50,
  },
});
