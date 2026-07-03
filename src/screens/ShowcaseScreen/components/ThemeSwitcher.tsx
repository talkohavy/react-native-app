import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Theme } from '../../../common/constants';
import { PALETTES } from '../palettes';

type ThemeSwitcherProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

function Dot({ color, isActive, onPress }: { color: string; isActive: boolean; onPress: () => void }) {
  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isActive ? 1.25 : 1, { damping: 10, stiffness: 180 }) }],
    borderWidth: withSpring(isActive ? 3 : 0, { damping: 12 }),
  }));

  return (
    <Pressable onPress={onPress} hitSlop={10}>
      <Animated.View style={[styles.dot, { backgroundColor: color }, dotStyle]} />
    </Pressable>
  );
}

export function ThemeSwitcher({ activeIndex, onSelect }: ThemeSwitcherProps) {
  return (
    <View style={styles.row}>
      {PALETTES.map((palette, index) => (
        <Dot
          key={palette.name}
          color={palette.accent}
          isActive={index === activeIndex}
          onPress={() => onSelect(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: Theme.light.colors.base_0,
  },
});
