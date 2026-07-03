import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import type { Route } from '@src/common/types';

type ScreenLinkProps = {
  item: Route;
  onPress: () => void;
};

export default function ScreenLink(props: ScreenLinkProps) {
  const { item, onPress } = props;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <Text style={styles.emoji}>{item.emoji}</Text>

      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Theme.light.colors.base_0,
    borderWidth: 1,
    borderColor: Theme.light.colors.base_10,
    borderRadius: 14,
    padding: 16,
    marginBottom: 4,
  },
  cardPressed: {
    backgroundColor: Theme.light.colors.base_10,
  },
  emoji: {
    fontSize: 28,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: Theme.light.colors.base_100,
    fontSize: Theme.fontSizes.md,
    fontWeight: '600',
  },
  cardDescription: {
    color: Theme.light.colors.base_60,
    fontSize: Theme.fontSizes.xs,
    marginTop: 2,
  },
  chevron: {
    color: Theme.light.colors.base_40,
    fontSize: Theme.fontSizes.xl_2,
  },
});
