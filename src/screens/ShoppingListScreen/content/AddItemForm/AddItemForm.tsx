import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Theme } from '@src/common/constants';

type AddItemFormProps = {
  onAdd: (name: string) => void;
};

export default function AddItemForm(props: AddItemFormProps) {
  const { onAdd } = props;

  const [value, setValue] = useState('');

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  const buttonStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.addButton, pressed && styles.addButtonPressed],
    [styles],
  );

  return (
    <View style={styles.row}>
      <TextInput
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleAdd}
        returnKeyType='done'
        style={styles.input}
        placeholder='Add an item...'
        placeholderTextColor={Theme.light.colors.base_50}
      />

      <Pressable onPress={handleAdd} style={buttonStyle}>
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_20,
    backgroundColor: Theme.light.colors.base_0,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_100,
  },
  addButton: {
    backgroundColor: Theme.light.colors.base_100,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    color: Theme.light.colors.base_0,
    fontWeight: '600',
    fontSize: Theme.fontSizes.md,
  },
});
