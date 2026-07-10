import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import Modal from '@src/components/Modal';
import DemoButton from '../DemoButton';
import { useConfirmModalDemoLogic } from './logic/useConfirmModalDemoLogic';

export default function ConfirmModalDemo() {
  const { visible, open, close, confirmDelete, cancel, lastAction } = useConfirmModalDemoLogic();

  return (
    <View style={styles.container}>
      <DemoButton label='Delete item' onPress={open} variant='danger' />

      {lastAction && <Text style={styles.result}>{lastAction}</Text>}

      <Modal visible={visible} onRequestClose={close} dismissOnBackdropPress={false}>
        <Text style={styles.title}>Delete this item?</Text>
        <Text style={styles.body}>
          This can't be undone. Unlike the other demos, tapping the backdrop won't close this one — you must explicitly
          choose an option below.
        </Text>

        <View style={styles.actions}>
          <DemoButton label='Cancel' onPress={cancel} variant='secondary' />
          <DemoButton label='Delete' onPress={confirmDelete} variant='danger' />
        </View>
      </Modal>
    </View>
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
  title: {
    fontSize: Theme.fontSizes.lg,
    fontWeight: '700',
    color: Theme.light.colors.base_100,
    marginBottom: Theme.spacing.sm,
  },
  body: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.light.colors.base_70,
    marginBottom: Theme.spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.sm,
  },
});
