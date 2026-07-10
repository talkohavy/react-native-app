import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import CachePolicyDemo from './content/CachePolicyDemo';
import ContentFitDemo from './content/ContentFitDemo';
import HeroTransitionDemo from './content/HeroTransitionDemo';

export default function ExpoImageScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Placeholder + transition</Text>

        <HeroTransitionDemo />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>contentFit</Text>

        <ContentFitDemo />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Cache policy & static methods</Text>

        <CachePolicyDemo />
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
