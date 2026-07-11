import { useCallback, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { useCameraPermissions, type CameraView } from 'expo-camera';

export function useCameraScreenLogic() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<null | string>(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const handleTakePhoto = useCallback(async () => {
    if (!cameraRef.current || isTakingPhoto) return;

    setIsTakingPhoto(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

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
    cameraRef,
    handleTakePhoto,
    handleRetake,
    openPhoneSettings,
  };
}
