import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/common/constants';
import AddBookModal from './content/AddBookModal';
import BooksEmptyState from './content/BooksEmptyState';
import { useBooksScreenLogic } from './logic/useBooksScreenLogic';

export default function BooksScreen() {
  const { books, columnsCount, isModalVisible, openModal, closeModal, handleAdd, BookItem } = useBooksScreenLogic();

  const addButtonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.addButton, pressed && styles.addButtonPressed],
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key={columnsCount}
        data={books}
        numColumns={columnsCount}
        renderItem={BookItem}
        // keyExtractor={(book) => book.id}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Pressable onPress={openModal} style={addButtonStyle}>
              <Text style={styles.addButtonIcon}>＋</Text>
              <Text style={styles.addButtonText}>Add Book</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={BooksEmptyState}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />

      <AddBookModal visible={isModalVisible} onClose={closeModal} onAdd={handleAdd} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.light.colors.base_0,
  },
  list: {
    padding: Theme.spacing.md,
    gap: Theme.spacing.sm,
    flexGrow: 1,
  },
  row: {
    gap: Theme.spacing.sm,
  },
  listHeader: {
    marginBottom: Theme.spacing.xs,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.xs,
    backgroundColor: Theme.light.colors.base_100,
    borderRadius: Theme.borderRadius.sm,
    paddingVertical: Theme.spacing.md,
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonIcon: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.md,
    fontWeight: '300',
    lineHeight: 20,
  },
  addButtonText: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
  },
});
