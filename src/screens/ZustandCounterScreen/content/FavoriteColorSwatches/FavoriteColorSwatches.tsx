import { StyleSheet, View } from 'react-native';
import { Theme } from '@src/common/constants';
import { favoriteColorSelector, setFavoriteColorSelector } from '@src/store/selectors/favoriteColorSelector';
import { favoriteColorOptions, useCounterStore } from '@src/store/useCounterStore';
import ColorSwatch from './ColorSwatch';

export default function FavoriteColorSwatches() {
  const favoriteColor = useCounterStore(favoriteColorSelector);
  const setFavoriteColor = useCounterStore(setFavoriteColorSelector);

  return (
    <View style={styles.row}>
      {favoriteColorOptions.map((color) => (
        <ColorSwatch key={color} color={color} isSelected={color === favoriteColor} onSelect={setFavoriteColor} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.md,
  },
});
