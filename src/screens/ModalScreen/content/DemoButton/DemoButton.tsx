import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { Theme } from '@src/common/constants';

type DemoButtonVariant = 'primary' | 'secondary' | 'danger';

type DemoButtonProps = {
  label: string;
  onPress: () => void;
  variant?: DemoButtonVariant;
};

export default function DemoButton(props: DemoButtonProps) {
  const { label, onPress, variant = 'primary' } = props;

  const buttonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.button, variantStyles[variant], pressed && styles.buttonPressed],
    [variant],
  );

  return (
    <Pressable onPress={onPress} style={buttonStyle} hitSlop={8}>
      <Text style={[styles.buttonText, variant === 'secondary' && styles.buttonTextSecondary]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  primary: {
    backgroundColor: Theme.light.colors.base_100,
  },
  secondary: {
    backgroundColor: Theme.light.colors.base_10,
  },
  danger: {
    backgroundColor: Theme.light.colors.red,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
    color: Theme.light.colors.base_0,
  },
  buttonTextSecondary: {
    color: Theme.light.colors.base_90,
  },
});

const variantStyles: Record<DemoButtonVariant, ViewStyle> = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
};
