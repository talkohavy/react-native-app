import { StyleSheet, Text } from 'react-native';
import { Theme } from '@src/common/constants';
import Modal from '@src/components/Modal';
import DemoButton from '../DemoButton';
import { useBasicModalDemoLogic } from './logic/useBasicModalDemoLogic';

export default function BasicModalDemo() {
  const { visible, open, close } = useBasicModalDemoLogic();

  return (
    <>
      <DemoButton label='Open basic modal' onPress={open} />

      <Modal visible={visible} onRequestClose={close}>
        <Text style={styles.title}>Basic modal</Text>

        <Text style={styles.body}>
          Fades in over a dimmed backdrop. Tap outside the card, press the Android back button, or tap the button below
          to close it.
        </Text>

        <DemoButton label='Close' onPress={close} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
});
