import { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { PALETTES } from '../palettes';

const { width, height } = Dimensions.get('window');

// Precomputed outside of any worklet: Reanimated worklets can't reliably call
// Array.prototype.map with an inline callback, so we build plain string arrays once here.
const PALETTE_INPUT_RANGE: number[] = [];
const BACKGROUND_TOP: string[] = [];
const BACKGROUND_MID: string[] = [];
const BACKGROUND_BOTTOM: string[] = [];
const ACCENT_COLORS: string[] = [];
const ACCENT2_COLORS: string[] = [];
for (let i = 0; i < PALETTES.length; i++) {
  PALETTE_INPUT_RANGE.push(i);
  BACKGROUND_TOP.push(PALETTES[i].background[0]);
  BACKGROUND_MID.push(PALETTES[i].background[1]);
  BACKGROUND_BOTTOM.push(PALETTES[i].background[2]);
  ACCENT_COLORS.push(PALETTES[i].accent);
  ACCENT2_COLORS.push(PALETTES[i].accent2);
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

type AuroraBackgroundProps = {
  paletteIndex: SharedValue<number>;
};

type OrbConfig = {
  size: number;
  top: number;
  left: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  useSecondary?: boolean;
};

const ORBS: OrbConfig[] = [
  { size: 260, top: -60, left: -60, driftX: 40, driftY: 60, duration: 6000, delay: 0 },
  { size: 220, top: 120, left: width - 180, driftX: -50, driftY: 40, duration: 7200, delay: 400, useSecondary: true },
  { size: 200, top: height * 0.45, left: -70, driftX: 60, driftY: -40, duration: 6600, delay: 800, useSecondary: true },
  { size: 280, top: height * 0.62, left: width - 220, driftX: -40, driftY: -60, duration: 8000, delay: 200 },
];

function Orb({
  size,
  top,
  left,
  driftX,
  driftY,
  duration,
  delay,
  useSecondary,
  paletteIndex,
}: OrbConfig & AuroraBackgroundProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, duration, progress]);

  const orbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [0, driftX]) },
      { translateY: interpolate(progress.value, [0, 1], [0, driftY]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.18]) },
    ],
  }));

  const source = useSecondary ? ACCENT2_COLORS : ACCENT_COLORS;

  const gradientAnimatedProps = useAnimatedProps(() => {
    const color = interpolateColor(paletteIndex.value, PALETTE_INPUT_RANGE, source);
    return { colors: [color, 'transparent'] as [string, string] };
  });

  return (
    <Animated.View
      pointerEvents='none'
      style={[styles.orb, { width: size, height: size, top, left, borderRadius: size / 2 }, orbStyle]}
    >
      <AnimatedGradient
        colors={[useSecondary ? PALETTES[0].accent2 : PALETTES[0].accent, 'transparent']}
        animatedProps={gradientAnimatedProps}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
}

export function AuroraBackground({ paletteIndex }: AuroraBackgroundProps) {
  const backgroundAnimatedProps = useAnimatedProps(() => {
    const top = interpolateColor(paletteIndex.value, PALETTE_INPUT_RANGE, BACKGROUND_TOP);
    const mid = interpolateColor(paletteIndex.value, PALETTE_INPUT_RANGE, BACKGROUND_MID);
    const bottom = interpolateColor(paletteIndex.value, PALETTE_INPUT_RANGE, BACKGROUND_BOTTOM);
    return { colors: [top, mid, bottom] as [string, string, string] };
  });

  return (
    <Animated.View pointerEvents='none' style={StyleSheet.absoluteFill}>
      <AnimatedGradient
        colors={PALETTES[0].background}
        animatedProps={backgroundAnimatedProps}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />
      {ORBS.map((orb, index) => (
        <Orb key={index} paletteIndex={paletteIndex} {...orb} />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    opacity: 0.55,
    overflow: 'hidden',
  },
});
