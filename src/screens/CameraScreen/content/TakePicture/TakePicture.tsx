import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView } from 'expo-camera';
import { Theme } from '@src/common/constants';

type TakePictureProps = {
  cameraRef: React.RefObject<CameraView | null>;
  facing: 'front' | 'back';
  handleTakePhoto: () => void;
  handleFlipCamera: () => void;
  isTakingPhoto: boolean;
};

export default function TakePicture(props: TakePictureProps) {
  const { cameraRef, facing, handleTakePhoto, handleFlipCamera, isTakingPhoto } = props;

  return (
    <SafeAreaView style={styles.flex} edges={['top', 'bottom', 'left', 'right']}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        animateShutter
        flash='on'
        // enableTorch
        // zoom={1}
        // mode='video'
        // mute
      />

      {Platform.OS !== 'web' && (
        <Pressable onPress={handleFlipCamera} style={styles.flipButton}>
          <Text style={styles.flipIcon}>⟳</Text>
        </Pressable>
      )}

      <SafeAreaView style={styles.controls} edges={['bottom']}>
        <Pressable
          onPress={handleTakePhoto}
          disabled={isTakingPhoto}
          style={({ pressed }) => [styles.shutterRing, (pressed || isTakingPhoto) && styles.shutterRingPressed]}
        >
          <View style={styles.shutterButton} />
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Theme.light.colors.black,
    justifyContent: 'space-between',
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: Theme.spacing.xl,
  },
  shutterRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: Theme.light.colors.base_0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRingPressed: {
    opacity: 0.6,
  },
  shutterButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Theme.light.colors.base_0,
  },
  flipButton: {
    position: 'absolute',
    right: Theme.spacing.xl,
    top: Theme.spacing.xl * 2,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipIcon: {
    color: Theme.light.colors.base_0,
    fontSize: 26,
    lineHeight: 26,
    includeFontPadding: false,
    marginTop: -8,
    marginLeft: 5,
  },
});
