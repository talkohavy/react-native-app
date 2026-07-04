import { useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Theme } from '@src/common/constants';
import AddItemForm from './content/AddItemForm';
import EmptyState from './content/EmptyState';
import ItemSeparator from './content/ItemSeparator';
import ShoppingListItem from './content/ShoppingListItem';
import { getItemKey } from './logic/utils/getItemKey';
import type { ShoppingItem } from './types';

export default function ShoppingListScreen() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const handleAdd = (name: string) => {
    setItems((current) => [...current, { id: Date.now().toString(), name }]);
  };

  const handleRemove = (id: string) => {
    const item = items.find((current) => current.id === id);

    const title = 'Remove item';
    const description = item ? `Remove "${item.name}" from your list?` : 'Remove this item from your list?';

    Alert.alert(title, description, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setItems((current) => current.filter((listItem) => listItem.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        // biome-ignore lint/performance/noJsxPropsBind: no
        renderItem={({ item }) => <ShoppingListItem item={item} onRemove={handleRemove} />}
        keyExtractor={getItemKey} // <--- if keyExtractor is ommitted, FlatList automatically looks for id or key in the item
        ListHeaderComponent={
          <View style={styles.formWrapper}>
            <AddItemForm onAdd={handleAdd} />
          </View>
        }
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.list}
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
    paddingVertical: Theme.spacing.md,
  },
  list: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
    flexGrow: 1,
  },
});
