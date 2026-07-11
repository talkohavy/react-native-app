import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/common/constants';

type PermissionNotGrantedProps = {
  wasDenied: boolean;
  openPhoneSettings: () => void;
  requestPermission: () => void;
};

export default function PermissionNotGranted(props: PermissionNotGrantedProps) {
  const { wasDenied, openPhoneSettings, requestPermission } = props;

  return (
    <SafeAreaView style={styles.centeredContainer} edges={['top', 'bottom', 'left', 'right']}>
      <Text style={styles.deniedIcon}>{wasDenied ? '🚫' : '📷'}</Text>

      <Text style={styles.deniedTitle}>{wasDenied ? 'Camera Access Denied' : 'Camera Permission Required'}</Text>

      <Text style={styles.deniedMessage}>
        {wasDenied
          ? 'You denied camera access. To take photos, please enable it in your device settings.'
          : 'This screen needs camera access to let you take photos.'}
      </Text>

      {wasDenied ? (
        <Pressable
          onPress={openPhoneSettings}
          style={({ pressed }) => [styles.permissionButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.permissionButtonText}>Open Settings</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={requestPermission}
          style={({ pressed }) => [styles.permissionButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.permissionButtonText}>Allow Camera Access</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
    backgroundColor: Theme.light.colors.base_0,
  },
  deniedIcon: {
    fontSize: 64,
  },
  deniedTitle: {
    fontSize: Theme.fontSizes.xl,
    fontWeight: '700',
    color: Theme.light.colors.base_100,
    textAlign: 'center',
  },
  deniedMessage: {
    fontSize: Theme.fontSizes.md,
    color: Theme.light.colors.base_60,
    textAlign: 'center',
    lineHeight: 24,
  },
  permissionButton: {
    marginTop: Theme.spacing.sm,
    backgroundColor: Theme.light.colors.base_100,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
