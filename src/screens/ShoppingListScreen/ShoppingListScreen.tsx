import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Theme } from '@src/common/constants';
import AddItemForm from './content/AddItemForm';
import EmptyState from './content/EmptyState';
import ShoppingListItem from './content/ShoppingListItem';
import type { ShoppingItem } from './types';

export default function ShoppingListScreen() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const handleAdd = (name: string) => {
    setItems((current) => [...current, { id: Date.now().toString(), name }]);
  };

  const handleRemove = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <AddItemForm onAdd={handleAdd} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ShoppingListItem item={item} onRemove={handleRemove} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.light.colors.base_0,
  },
  formWrapper: {
    padding: Theme.spacing.md,
  },
  list: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
    flexGrow: 1,
  },
  separator: {
    height: Theme.spacing.sm,
  },
});
