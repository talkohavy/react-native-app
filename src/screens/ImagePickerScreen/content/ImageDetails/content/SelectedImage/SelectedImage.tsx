import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { PickedAsset } from '../../../../logic/useImagePickerScreenLogic';

type SelectedImageProps = {
  asset: PickedAsset;
  aspectRatio: number;
};

export default function SelectedImage(props: SelectedImageProps) {
  const { asset, aspectRatio } = props;

  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.imageCard}>
      <Image source={{ uri: asset.uri }} style={[styles.image, { aspectRatio }]} contentFit='cover' transition={300} />

      <View style={styles.imageBadge}>
        <Text style={styles.imageBadgeText}>
          {asset.width} × {asset.height}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  imageCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  image: {
    width: '100%',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  imageBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
