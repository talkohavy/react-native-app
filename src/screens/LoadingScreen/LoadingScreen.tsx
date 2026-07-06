import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../common/constants';
import LoadingSpinner from '../../components/LoadingSpinner';

const BACKGROUND = ['#0f0c29', '#302b63', '#24243e'] as const;
const ACCENT = '#8A5CF6';
const GLOW_SIZE = 220;

export default function LoadingScreen() {
  const pulse = useSharedValue(0);
  const textPulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
    textPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [pulse, textPulse]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.25 + pulse.value * 0.25,
    transform: [{ scale: 1 + pulse.value * 0.12 }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: 0.5 + textPulse.value * 0.5,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={BACKGROUND}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      <View style={styles.content}>
        <View style={styles.spinnerWrapper}>
          <Animated.View style={[styles.glow, glowStyle]}>
            <LinearGradient
              colors={[ACCENT, 'transparent']}
              style={styles.glowGradient}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>

          <LoadingSpinner />
        </View>

        <Animated.Text style={[styles.text, textStyle]}>Loading</Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: Theme.spacing.lg,
  },
  spinnerWrapper: {
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    overflow: 'hidden',
  },
  glowGradient: {
    flex: 1,
  },
  text: {
    color: Theme.dark.colors.base_100,
    fontSize: Theme.fontSizes.lg,
    fontWeight: '600',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});
