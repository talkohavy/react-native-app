import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛒</Text>
      <Text style={styles.text}>Your list is empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Theme.spacing.xl,
    gap: Theme.spacing.sm,
  },
  emoji: {
    fontSize: Theme.fontSizes.xl_5,
  },
  text: {
    color: Theme.light.colors.base_50,
    fontSize: Theme.fontSizes.md,
  },
});
