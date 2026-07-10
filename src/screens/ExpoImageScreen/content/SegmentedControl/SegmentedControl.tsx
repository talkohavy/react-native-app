import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';

type SegmentedControlProps<T extends string> = {
  options: { label: string; value: T }[];
  selected: T;
  onSelect: (value: T) => void;
};

export default function SegmentedControl<T extends string>(props: SegmentedControlProps<T>) {
  const { options, selected, onSelect } = props;

  return (
    <View style={styles.row}>
      {options.map((option) => (
        <Segment
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={option.value === selected}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}

type SegmentProps<T extends string> = {
  label: string;
  value: T;
  isSelected: boolean;
  onSelect: (value: T) => void;
};

function Segment<T extends string>(props: SegmentProps<T>) {
  const { label, value, isSelected, onSelect } = props;

  const handlePress = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  const segmentStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [
      styles.segment,
      isSelected && styles.segmentSelected,
      pressed && styles.segmentPressed,
    ],
    [isSelected],
  );

  return (
    <Pressable onPress={handlePress} style={segmentStyle} hitSlop={4}>
      <Text style={[styles.segmentText, isSelected && styles.segmentTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  segment: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    backgroundColor: Theme.light.colors.base_10,
  },
  segmentSelected: {
    backgroundColor: Theme.light.colors.base_100,
  },
  segmentPressed: {
    opacity: 0.7,
  },
  segmentText: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
    color: Theme.light.colors.base_70,
  },
  segmentTextSelected: {
    color: Theme.light.colors.base_0,
  },
});
