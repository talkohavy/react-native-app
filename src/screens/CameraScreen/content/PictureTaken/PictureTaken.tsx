import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/common/constants';

type PictureTakenProps = {
  photoUri: string;
  handleRetake: () => void;
};

export default function PictureTaken(props: PictureTakenProps) {
  const { photoUri, handleRetake } = props;

  return (
    <SafeAreaView style={styles.flex} edges={['top', 'bottom', 'left', 'right']}>
      <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode='cover' />

      <View style={styles.previewActions}>
        <Text style={styles.previewLabel}>Photo taken!</Text>

        <Pressable
          onPress={handleRetake}
          style={({ pressed }) => [styles.retakeButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.retakeButtonText}>Retake</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Theme.light.colors.black,
    justifyContent: 'space-between',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  previewImage: {
    flex: 1,
  },
  previewActions: {
    alignItems: 'center',
    gap: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  previewLabel: {
    fontSize: Theme.fontSizes.lg,
    fontWeight: '600',
    color: Theme.light.colors.base_0,
  },
  retakeButton: {
    backgroundColor: Theme.light.colors.base_0,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xl,
  },
  retakeButtonText: {
    color: Theme.light.colors.base_100,
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
  },
});
