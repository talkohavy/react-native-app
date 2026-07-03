import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type FlipCardProps = {
  colors: readonly [string, string];
  frontLabel: string;
  frontEmoji: string;
  backLabel: string;
};

export function FlipCard({ colors, frontLabel, frontEmoji, backLabel }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    rotation.value = withSpring(next ? 180 : 0, { damping: 14, stiffness: 90 });
  };

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotation.value}deg` }],
    opacity: interpolate(rotation.value, [0, 90, 91, 180], [1, 1, 0, 0]),
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotation.value + 180}deg` }],
    opacity: interpolate(rotation.value, [0, 89, 90, 180], [0, 0, 1, 1]),
  }));

  return (
    <Pressable onPress={toggle}>
      <Animated.View style={[styles.face, frontStyle]}>
        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
          <Text style={styles.emoji}>{frontEmoji}</Text>
          <Text style={styles.label}>{frontLabel}</Text>
          <Text style={styles.hint}>Tap to flip</Text>
        </LinearGradient>
      </Animated.View>
      <Animated.View style={[styles.face, styles.back, backStyle]}>
        <LinearGradient
          colors={['#111827', '#1f2937']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.backLabel}>{backLabel}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const SIZE = 130;

const styles = StyleSheet.create({
  face: {
    width: SIZE,
    height: SIZE,
    borderRadius: 20,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  hint: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    marginTop: 4,
  },
  backLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
