import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import type { ShoppingItem } from '../types';

type ShoppingListItemProps = {
  item: ShoppingItem;
  onRemove: (id: string) => void;
};

export default function ShoppingListItem(props: ShoppingListItemProps) {
  const { item, onRemove } = props;

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  const buttontStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.removeButton, pressed && styles.removeButtonPressed],
    [styles],
  );

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>

      <Pressable onPress={handleRemove} hitSlop={8} style={buttontStyle}>
        <Text style={styles.removeButtonText}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.light.colors.base_0,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_10,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
  },
  name: {
    flex: 1,
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_100,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: Theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.light.colors.base_10,
  },
  removeButtonPressed: {
    backgroundColor: Theme.light.colors.base_20,
  },
  removeButtonText: {
    color: Theme.light.colors.base_70,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '700',
  },
});
