import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/common/constants';
import Modal from '@src/components/Modal/Modal';
import { useFormScreenLogic } from './logic/useFormScreenLogic';

// eslint-disable-next-line
const cuteImage = require('@src/assets/cute.png') as number;

export default function FormScreen() {
  const { name, setName, amount, setAmount, amountRef, focusAmount, onSubmitClick, submission, closeModal } =
    useFormScreenLogic();

  const submitButtonStyle = ({ pressed }: { pressed: boolean }) => [
    styles.submitButton,
    pressed && styles.submitButtonPressed,
  ];

  const closeButtonStyle = ({ pressed }: { pressed: boolean }) => [
    styles.closeButton,
    pressed && styles.closeButtonPressed,
  ];

  return (
    <SafeAreaView style={styles.flex} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView style={styles.flex} behavior='padding'>
        <ScrollView style={styles.flex} contentContainerStyle={styles.content} keyboardShouldPersistTaps='handled'>
          <Image source={cuteImage} style={styles.image} resizeMode='contain' />

          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              onSubmitEditing={focusAmount}
              returnKeyType='next'
              style={styles.input}
              placeholder='Enter a name...'
              placeholderTextColor={Theme.light.colors.base_50}
              autoCapitalize='none'
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Amount</Text>

            <TextInput
              ref={amountRef}
              value={amount}
              onChangeText={setAmount}
              onSubmitEditing={onSubmitClick}
              returnKeyType='done'
              keyboardType='numeric'
              style={styles.input}
              placeholder='Enter a number...'
              placeholderTextColor={Theme.light.colors.base_50}
            />
          </View>

          <Pressable onPress={onSubmitClick} style={submitButtonStyle}>
            <Text style={styles.submitButtonText}>Add</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={submission !== null} onRequestClose={closeModal} animationType='fade'>
        <Text style={styles.modalTitle}>Submitted</Text>

        <View style={styles.modalDivider} />

        <View style={styles.modalRow}>
          <Text style={styles.modalFieldLabel}>Name</Text>
          <Text style={styles.modalFieldValue}>{submission?.name}</Text>
        </View>

        <View style={styles.modalRow}>
          <Text style={styles.modalFieldLabel}>Amount</Text>
          <Text style={styles.modalFieldValue}>{submission?.amount}</Text>
        </View>

        <Pressable onPress={closeModal} style={closeButtonStyle}>
          <Text style={styles.closeButtonText}>Done</Text>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 320,
    alignSelf: 'center',
  },
  content: {
    padding: Theme.spacing.lg,
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
    backgroundColor: Theme.light.colors.base_0,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_100,
    // Works only on IOS:
    shadowColor: Theme.light.colors.base_100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    // Works only on Android:
    elevation: 1,
  },
  submitButton: {
    backgroundColor: Theme.light.colors.base_100,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  submitButtonPressed: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: Theme.fontSizes.lg,
    fontWeight: '700',
    color: Theme.light.colors.base_100,
    marginBottom: Theme.spacing.sm,
  },
  modalDivider: {
    height: 1,
    backgroundColor: Theme.light.colors.base_10,
    marginBottom: Theme.spacing.md,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  modalFieldLabel: {
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
    color: Theme.light.colors.base_60,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalFieldValue: {
    fontSize: Theme.fontSizes.md,
    fontWeight: '500',
    color: Theme.light.colors.base_100,
  },
  closeButton: {
    marginTop: Theme.spacing.lg,
    backgroundColor: Theme.light.colors.base_100,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
  },
  closeButtonPressed: {
    opacity: 0.7,
  },
  closeButtonText: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
  },
});
