import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Theme } from '@src/common/constants';
import { useHeroTransitionDemoLogic } from './logic/useHeroTransitionDemoLogic';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function HeroTransitionDemo() {
  const { uri, onNext } = useHeroTransitionDemoLogic();

  return (
    <View style={styles.container}>
      {/**
       * `recyclingKey` clears the view back to the placeholder whenever the
       * source changes, so `transition` always cross-dissolves in the new
       * photo instead of flashing the previous one first.
       */}
      <Image
        style={styles.image}
        source={uri}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={600}
        recyclingKey={uri}
      />

      <Pressable onPress={onNext} style={styles.button} hitSlop={8}>
        <Text style={styles.buttonText}>Next photo →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.light.colors.base_10,
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.light.colors.base_100,
  },
  buttonText: {
    color: Theme.light.colors.base_0,
    fontSize: Theme.fontSizes.sm,
    fontWeight: '600',
  },
});
