import { useCallback } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Theme } from '@src/common/constants';
import AddItemForm from './content/AddItemForm';
import EmptyState from './content/EmptyState';
import ItemSeparator from './content/ItemSeparator';
import ShoppingListItem from './content/ShoppingListItem';
import { useShoppingList } from './logic/hooks/useShoppingList';
import { getItemKey } from './logic/utils/getItemKey';
import type { ShoppingItem } from './types';

export default function ShoppingListScreen() {
  const { items, addItem, removeItem } = useShoppingList();

  const handleRemove = (id: string) => {
    const item = items.find((current) => current.id === id);

    const title = 'Remove item';
    const description = item ? `Remove "${item.name}" from your list?` : 'Remove this item from your list?';

    Alert.alert(title, description, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeItem(id),
      },
    ]);
  };

  const renderItem = useCallback((props: { item: ShoppingItem }) => {
    const { item } = props;
    return <ShoppingListItem item={item} onRemove={handleRemove} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={getItemKey} // <--- if keyExtractor is ommitted, FlatList automatically looks for id or key in the item
        ListHeaderComponent={
          <View style={styles.formWrapper}>
            <AddItemForm onAdd={addItem} />
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
