import { FlatList, StyleSheet, View } from 'react-native';
import { Theme } from '@src/common/constants';
import AddItemForm from './content/AddItemForm';
import EmptyState from './content/EmptyState';
import ItemSeparator from './content/ItemSeparator';
import { useShoppingListScreenLogic } from './logic/useShoppingListScreenLogic';
import { getItemKey } from './logic/utils/getItemKey';

export default function ShoppingListScreen() {
  const { items, addItem, renderItem } = useShoppingListScreenLogic();

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
