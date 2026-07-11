import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView } from 'expo-camera';
import { Theme } from '@src/common/constants';

type TakePictureProps = {
  cameraRef: React.RefObject<CameraView | null>;
  handleTakePhoto: () => void;
  isTakingPhoto: boolean;
};

export default function TakePicture(props: TakePictureProps) {
  const { cameraRef, handleTakePhoto, isTakingPhoto } = props;

  return (
    <View style={styles.flex}>
      <CameraView ref={cameraRef} style={styles.camera} facing='front' />

      <SafeAreaView style={styles.controls} edges={['bottom']}>
        <Pressable
          onPress={handleTakePhoto}
          disabled={isTakingPhoto}
          style={({ pressed }) => [styles.shutterRing, (pressed || isTakingPhoto) && styles.shutterRingPressed]}
        >
          <View style={styles.shutterButton} />
        </Pressable>
      </SafeAreaView>
    </View>
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
});
