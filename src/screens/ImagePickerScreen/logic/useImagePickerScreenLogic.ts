import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export type PickedAsset = ImagePicker.ImagePickerAsset;

export function useImagePickerScreenLogic() {
  const [asset, setAsset] = useState<PickedAsset | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePickImage = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        allowsEditing: false,
        exif: true,
        // defaultTab:'photos',
        // videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
        // aspect: [1, 1],
      });

      if (!result.canceled && result.assets.length > 0) {
        setAsset(result.assets[0]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setAsset(null);
  }, []);

  return { asset, isLoading, handlePickImage, handleClear };
}
