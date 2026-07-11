import NoContent from './content/NoContent';
import PermissionNotGranted from './content/PermissionNotGranted';
import PictureTaken from './content/PictureTaken';
import TakePicture from './content/TakePicture';
import { useCameraScreenLogic } from './logic/useCameraScreenLogic';

export default function CameraScreen() {
  const {
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
  } = useCameraScreenLogic();

  if (!permission) return <NoContent />;

  if (!permission.granted) {
    const wasDenied = permission.status === 'denied';

    return (
      <PermissionNotGranted
        wasDenied={wasDenied}
        openPhoneSettings={openPhoneSettings}
        requestPermission={requestPermission}
      />
    );
  }

  if (photoUri) {
    return <PictureTaken photoUri={photoUri} handleRetake={handleRetake} />;
  }

  return (
    <TakePicture
      cameraRef={cameraRef}
      facing={facing}
      handleTakePhoto={handleTakePhoto}
      handleFlipCamera={handleFlipCamera}
      isTakingPhoto={isTakingPhoto}
    />
  );
}
