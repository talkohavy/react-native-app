import { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const PARTICLE_COLORS = ['#FF6FB5', '#22D3EE', '#FFD166', '#8A5CF6', '#4CC9F0', '#FF7A59'];
const PARTICLE_COUNT = 18;

type Particle = {
  angle: number;
  distance: number;
  color: string;
  size: number;
  spin: number;
};

function ConfettiParticle({ particle, progress }: { particle: Particle; progress: SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const eased = interpolate(progress.value, [0, 1], [0, 1]);
    const gravity = eased * eased * 40;
    const x = Math.cos(particle.angle) * particle.distance * eased;
    const y = Math.sin(particle.angle) * particle.distance * eased + gravity;
    const opacity = interpolate(progress.value, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);
    const scale = interpolate(progress.value, [0, 0.2, 1], [0, 1, 0.5]);

    return {
      opacity,
      transform: [{ translateX: x }, { translateY: y }, { rotate: `${particle.spin * eased}deg` }, { scale }],
    };
  });

  return (
    <Animated.View
      pointerEvents='none'
      style={[
        styles.particle,
        { width: particle.size, height: particle.size * 0.4, backgroundColor: particle.color },
        style,
      ]}
    />
  );
}

type ConfettiButtonProps = {
  label: string;
  icon?: string;
  colors: readonly [string, string];
  onPress?: () => void;
};

export function ConfettiButton({ label, icon = '🎉', colors, onPress }: ConfettiButtonProps) {
  const burstProgress = useSharedValue(0);
  const pressScale = useSharedValue(1);
  const shineProgress = useSharedValue(0);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        angle: (Math.PI * 2 * index) / PARTICLE_COUNT + Math.random() * 0.5,
        distance: 70 + Math.random() * 60,
        color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
        size: 8 + Math.random() * 6,
        spin: Math.random() * 360 - 180,
      })),
    [],
  );

  useEffect(() => {
    shineProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800, easing: Easing.linear }),
        withDelay(1200, withTiming(0, { duration: 0 })),
      ),
      -1,
      false,
    );
  }, [shineProgress]);

  const handlePress = () => {
    pressScale.value = withSequence(withTiming(0.9, { duration: 90 }), withSpring(1, { damping: 8, stiffness: 200 }));
    burstProgress.value = 0;
    burstProgress.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) });
    onPress?.();
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shineProgress.value, [0, 1], [-160, 220]) }, { rotate: '20deg' }],
  }));

  return (
    <View style={styles.wrapper}>
      <View pointerEvents='none' style={styles.particleField}>
        {particles.map((particle, index) => (
          <ConfettiParticle key={index} particle={particle} progress={burstProgress} />
        ))}
      </View>
      <Animated.View style={buttonStyle}>
        <Pressable onPress={handlePress}>
          <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.button}>
            <Animated.View style={[styles.shine, shineStyle]} />
            <Text style={styles.buttonText}>
              {icon} {label}
            </Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  particleField: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  particle: {
    position: 'absolute',
    borderRadius: 3,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: '#8A5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  shine: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    width: 50,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
