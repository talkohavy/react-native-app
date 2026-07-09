import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Theme } from '@src/common/constants';

type ColorSwatchProps = {
  color: string;
  isSelected: boolean;
  onSelect: (color: string) => void;
};

export default function ColorSwatch(props: ColorSwatchProps) {
  const { color, isSelected, onSelect } = props;

  const handleSelect = useCallback(() => {
    onSelect(color);
  }, [color, onSelect]);

  return (
    <Pressable
      onPress={handleSelect}
      style={[styles.swatch, { backgroundColor: color }, isSelected && styles.swatchSelected]}
      hitSlop={6}
    />
  );
}

const styles = StyleSheet.create({
  swatch: {
    width: 36,
    height: 36,
    borderRadius: Theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchSelected: {
    borderColor: Theme.light.colors.base_100,
  },
});
