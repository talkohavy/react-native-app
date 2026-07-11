import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/common/constants';
import { usePictureTakenLogic } from './logic/usePictureTakenLogic';

type PictureTakenProps = {
  photoUri: string;
  handleRetake: () => void;
};

export default function PictureTaken(props: PictureTakenProps) {
  const { photoUri, handleRetake } = props;

  const { containerWidth, containerHeight, composedGesture, animatedImageStyle } = usePictureTakenLogic();

  return (
    <SafeAreaView style={styles.flex} edges={['top', 'bottom', 'left', 'right']}>
      <View
        style={styles.imageWrapper}
        onLayout={(e) => {
          containerWidth.value = e.nativeEvent.layout.width;
          containerHeight.value = e.nativeEvent.layout.height;
        }}
      >
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.flex, animatedImageStyle]}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode='cover' />
          </Animated.View>
        </GestureDetector>
      </View>

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
  imageWrapper: {
    flex: 1,
    overflow: 'hidden',
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
