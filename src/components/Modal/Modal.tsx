import { type PropsWithChildren } from 'react';
import {
  Modal as ReactNativeModal,
  Pressable,
  StyleSheet,
  type ModalProps as ReactNativeModalProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Theme } from '@src/common/constants';

type ModalProps = PropsWithChildren<{
  visible: boolean;
  onRequestClose: () => void;
  animationType?: ReactNativeModalProps['animationType'];
  dismissOnBackdropPress?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export default function Modal(props: ModalProps) {
  const {
    visible,
    onRequestClose,
    children,
    animationType = 'fade',
    dismissOnBackdropPress = true,
    contentStyle,
  } = props;

  return (
    <ReactNativeModal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType={animationType}
      onRequestClose={onRequestClose}
    >
      <Pressable style={styles.backdrop} onPress={dismissOnBackdropPress ? onRequestClose : undefined}>
        <Pressable style={[styles.content, contentStyle]} onPress={swallowPress}>
          {children}
        </Pressable>
      </Pressable>
    </ReactNativeModal>
  );
}

// Claims the touch so it doesn't bubble up to the backdrop's dismiss handler.
function swallowPress() {}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '100%',
    maxWidth: 420,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.light.colors.base_0,
  },
});
