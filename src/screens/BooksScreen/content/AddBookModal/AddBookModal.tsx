import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Theme } from '@src/common/constants';
import Modal from '@src/components/Modal';
import { useAddBookModalLogic } from './logic/useAddBookModalLogic';
import type { Book } from '@src/store/books';

type AddBookModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (book: Omit<Book, 'id'>) => void;
};

export default function AddBookModal(props: AddBookModalProps) {
  const { visible, onClose, onAdd } = props;

  const {
    authorRef,
    descriptionRef,
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    handleAdd,
    handleClose,
  } = useAddBookModalLogic({ onAdd, onClose });

  const addButtonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.addButton, pressed && styles.addButtonPressed],
    [],
  );

  const cancelButtonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.cancelButton, pressed && styles.cancelButtonPressed],
    [],
  );

  return (
    <Modal visible={visible} onRequestClose={handleClose} dismissOnBackdropPress={false}>
      <Text style={styles.modalTitle}>Add Book</Text>

      <View style={styles.divider} />

      <View style={styles.fields}>
        <View style={styles.field}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={() => authorRef.current?.focus()}
            style={styles.input}
            placeholder='Enter book title...'
            placeholderTextColor={Theme.light.colors.base_50}
            returnKeyType='next'
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Author *</Text>
          <TextInput
            ref={authorRef}
            value={author}
            onChangeText={setAuthor}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            style={styles.input}
            placeholder='Enter author name...'
            placeholderTextColor={Theme.light.colors.base_50}
            returnKeyType='next'
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            ref={descriptionRef}
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            placeholder='Optional description...'
            placeholderTextColor={Theme.light.colors.base_50}
            multiline
            returnKeyType='done'
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={handleClose} style={cancelButtonStyle}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>

        <Pressable onPress={handleAdd} style={addButtonStyle}>
          <Text style={styles.addButtonText}>Add Book</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: Theme.fontSizes.lg,
    fontWeight: '700',
    color: Theme.light.colors.base_100,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.light.colors.base_10,
    marginVertical: Theme.spacing.md,
  },
  fields: {
    gap: Theme.spacing.md,
  },
  field: {
    gap: Theme.spacing.xs,
  },
  label: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
    color: Theme.light.colors.base_70,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.light.colors.base_20,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_100,
    backgroundColor: Theme.light.colors.base_0,
  },
  textArea: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.lg,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_20,
    borderRadius: Theme.borderRadius.sm,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
  },
  cancelButtonPressed: {
    backgroundColor: Theme.light.colors.base_10,
  },
  cancelButtonText: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
    color: Theme.light.colors.base_70,
  },
  addButton: {
    flex: 1,
    backgroundColor: Theme.light.colors.base_100,
    borderRadius: Theme.borderRadius.sm,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
    color: Theme.light.colors.base_0,
  },
});
