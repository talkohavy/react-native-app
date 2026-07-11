import { useCallback, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { useCameraPermissions, type CameraView } from 'expo-camera';

export function useCameraScreenLogic() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<null | string>(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const cameraRef = useRef<CameraView>(null);

  const handleFlipCamera = useCallback(() => {
    setFacing((prev) => (prev === 'front' ? 'back' : 'front'));
  }, []);

  const handleTakePhoto = useCallback(async () => {
    if (!cameraRef.current || isTakingPhoto) return;

    setIsTakingPhoto(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8, // <--- 1 is highest quality
        // isImageMirror: false, // <--- even if set to `false`, during the photo capture, the image is still mirrored.
      });

      if (photo) {
        setPhotoUri(photo.uri);
      }
    } finally {
      setIsTakingPhoto(false);
    }
  }, [isTakingPhoto]);

  const handleRetake = useCallback(() => {
    setPhotoUri(null);
  }, []);

  const openPhoneSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  return {
    permission,
    requestPermission,
    photoUri,
    isTakingPhoto,
    facing,
    cameraRef,
    handleTakePhoto,
    handleFlipCamera,
    handleRetake,
    openPhoneSettings,
  };
}
