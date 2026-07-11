import EmptyState from './content/EmptyState';
import ImageDetails from './content/ImageDetails';
import { useImagePickerScreenLogic } from './logic/useImagePickerScreenLogic';

export default function ImagePickerScreen() {
  const { asset, isLoading, handlePickImage, handleClear } = useImagePickerScreenLogic();

  if (asset) {
    return (
      <ImageDetails
        asset={asset}
        isLoading={isLoading}
        onClear={handleClear}
        onPickNew={handlePickImage}
      />
    );
  }

  return <EmptyState onPickImage={handlePickImage} isLoading={isLoading} />;
}
