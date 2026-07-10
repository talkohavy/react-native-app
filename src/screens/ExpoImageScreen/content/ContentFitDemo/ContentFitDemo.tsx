import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Theme } from '@src/common/constants';
import { contentFitOptions } from '../../types';
import SegmentedControl from '../SegmentedControl';
import { useContentFitDemoLogic } from './logic/useContentFitDemoLogic';

const wideImageUri = 'https://picsum.photos/seed/expo-image-wide/1600/500';

export default function ContentFitDemo() {
  const { contentFit, setContentFit } = useContentFitDemoLogic();

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image style={styles.image} source={wideImageUri} contentFit={contentFit} transition={300} />
      </View>

      <SegmentedControl options={contentFitOptions} selected={contentFit} onSelect={setContentFit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },
  frame: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_20,
    backgroundColor: Theme.light.colors.base_10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
