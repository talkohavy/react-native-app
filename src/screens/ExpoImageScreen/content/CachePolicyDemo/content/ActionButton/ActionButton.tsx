import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Theme } from '@src/common/constants';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
};

export default function ActionButton(props: ActionButtonProps) {
  const { label, onPress } = props;

  const buttonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.actionButton, pressed && styles.actionButtonPressed],
    [],
  );

  return (
    <Pressable onPress={onPress} style={buttonStyle} hitSlop={4}>
      <Text style={styles.actionButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_20,
  },
  actionButtonPressed: {
    opacity: 0.6,
  },
  actionButtonText: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
    color: Theme.light.colors.base_90,
  },
});
