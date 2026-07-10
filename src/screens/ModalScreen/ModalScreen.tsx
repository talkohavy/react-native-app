import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import BasicModalDemo from './content/BasicModalDemo';
import ConfirmModalDemo from './content/ConfirmModalDemo';
import SlideModalDemo from './content/SlideModalDemo';

export default function ModalScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Basic — fade + tap outside to dismiss</Text>

        <BasicModalDemo />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Slide-in action sheet</Text>

        <SlideModalDemo />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Non-dismissible confirmation</Text>

        <ConfirmModalDemo />
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
