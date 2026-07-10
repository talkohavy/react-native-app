import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import Modal from '@src/components/Modal';
import DemoButton from '../DemoButton';
import { menuOptions, useSlideModalDemoLogic } from './logic/useSlideModalDemoLogic';

export default function SlideModalDemo() {
  const { visible, open, close, selectOption, selected } = useSlideModalDemoLogic();

  return (
    <View style={styles.container}>
      <DemoButton label='Open options menu' onPress={open} />

      {selected && <Text style={styles.result}>Selected: {selected}</Text>}

      <Modal visible={visible} onRequestClose={close} animationType='slide' contentStyle={styles.sheet}>
        <Text style={styles.title}>Choose an action</Text>

        {menuOptions.map((option) => (
          <OptionRow key={option} label={option} onSelect={selectOption} />
        ))}
      </Modal>
    </View>
  );
}

type OptionRowProps = {
  label: string;
  onSelect: (label: string) => void;
};

function OptionRow(props: OptionRowProps) {
  const { label, onSelect } = props;

  const handlePress = useCallback(() => {
    onSelect(label);
  }, [onSelect, label]);

  return (
    <Pressable onPress={handlePress} style={styles.optionRow} hitSlop={4}>
      <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  result: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.light.colors.base_70,
  },
  sheet: {
    width: '100%',
    maxWidth: 360,
    gap: Theme.spacing.xs,
  },
  title: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '700',
    color: Theme.light.colors.base_100,
    marginBottom: Theme.spacing.sm,
  },
  optionRow: {
    paddingVertical: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.light.colors.base_10,
  },
  optionLabel: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.light.colors.base_90,
  },
});
