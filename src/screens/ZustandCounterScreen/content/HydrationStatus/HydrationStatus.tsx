import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import { useHasHydrated } from '@src/store/useHasHydrated';

export default function HydrationStatus() {
  const hasHydrated = useHasHydrated();

  return (
    <View style={[styles.badge, hasHydrated ? styles.badgeReady : styles.badgeLoading]}>
      <Text style={styles.text}>{hasHydrated ? '✅ Restored from AsyncStorage' : '⏳ Loading saved state...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.lg,
  },
  badgeReady: {
    backgroundColor: Theme.light.colors.lightGreen,
  },
  badgeLoading: {
    backgroundColor: Theme.light.colors.base_10,
  },
  text: {
    fontSize: Theme.fontSizes.xs,
    color: Theme.light.colors.base_90,
    fontWeight: '600',
  },
});
