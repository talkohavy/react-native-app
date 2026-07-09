import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import CounterActions from './content/CounterActions';
import CounterValue from './content/CounterValue';
import FavoriteColorSwatches from './content/FavoriteColorSwatches';
import HydrationStatus from './content/HydrationStatus';

export default function ZustandCounterScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HydrationStatus />

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Count</Text>
        <CounterValue />
        <CounterActions />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Favorite color</Text>
        <FavoriteColorSwatches />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.light.colors.base_0,
  },
  content: {
    padding: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  card: {
    backgroundColor: Theme.light.colors.base_0,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_10,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  cardLabel: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
    color: Theme.light.colors.base_60,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
