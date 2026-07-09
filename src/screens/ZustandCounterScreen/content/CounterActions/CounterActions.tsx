import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import { decrementSelector, incrementSelector, resetSelector } from '@src/store/selectors/countSelector';
import { useCounterStore } from '@src/store/useCounterStore';

export default function CounterActions() {
  const increment = useCounterStore(incrementSelector);
  const decrement = useCounterStore(decrementSelector);
  const reset = useCounterStore(resetSelector);

  const stepButtonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.stepButton, pressed && styles.buttonPressed],
    [],
  );
  const resetButtonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.resetButton, pressed && styles.buttonPressed],
    [],
  );

  return (
    <View style={styles.row}>
      <Pressable onPress={decrement} style={stepButtonStyle} hitSlop={8}>
        <Text style={styles.stepButtonText}>-</Text>
      </Pressable>

      <Pressable onPress={reset} style={resetButtonStyle} hitSlop={8}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </Pressable>

      <Pressable onPress={increment} style={stepButtonStyle} hitSlop={8}>
        <Text style={styles.stepButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.md,
  },
  stepButton: {
    width: 56,
    height: 56,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.light.colors.base_100,
  },
  resetButton: {
    height: 56,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.light.colors.base_20,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  stepButtonText: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.xl_2,
    fontWeight: '700',
  },
  resetButtonText: {
    color: Theme.light.colors.base_90,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
  },
});
