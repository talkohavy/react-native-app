import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import type { PALETTES } from '../palettes';

const CARD_WIDTH = 280;
const CARD_HEIGHT = 170;

type TiltCardProps = {
  activePalette: (typeof PALETTES)[number];
  onSwipedAway?: () => void;
};

export function TiltCard({ activePalette, onSwipedAway }: TiltCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isPressed = useSharedValue(0);

  // eslint-disable-next-line new-cap -- Gesture.Pan is a builder factory, not a constructor
  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = withSpring(1);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      isPressed.value = withSpring(0);
      const flungFar = Math.abs(event.velocityX) > 900 || Math.abs(translateX.value) > 160;
      if (flungFar && onSwipedAway) {
        runOnJS(onSwipedAway)();
      }
      translateX.value = withSpring(0, { damping: 12, stiffness: 120 });
      translateY.value = withSpring(0, { damping: 12, stiffness: 120 });
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(translateX.value, [-CARD_WIDTH / 2, CARD_WIDTH / 2], [-25, 25]);
    const rotateX = interpolate(translateY.value, [-CARD_HEIGHT / 2, CARD_HEIGHT / 2], [20, -20]);
    const scale = interpolate(isPressed.value, [0, 1], [1, 1.05]);

    return {
      transform: [
        { perspective: 800 },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateY: `${rotateY}deg` },
        { rotateX: `${rotateX}deg` },
        { scale },
      ],
    };
  });

  const sheenStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-CARD_WIDTH / 2, 0, CARD_WIDTH / 2], [0.5, 0.15, 0.5]),
    transform: [{ translateX: interpolate(translateX.value, [-CARD_WIDTH / 2, CARD_WIDTH / 2], [-60, 60]) }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, cardStyle]}>
        <LinearGradient
          colors={[activePalette.accent, activePalette.accent2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[styles.sheen, sheenStyle]} />
        <View style={styles.cardContent}>
          <Text style={styles.cardEyebrow}>DRAG ME</Text>
          <Text style={styles.cardTitle}>3D Tilt Card</Text>
          <Text style={styles.cardSubtitle}>Powered by Gesture Handler + Reanimated</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  sheen: {
    position: 'absolute',
    top: -40,
    bottom: -40,
    width: 90,
    backgroundColor: 'rgba(255,255,255,0.5)',
    transform: [{ rotate: '20deg' }],
  },
  cardContent: {
    padding: 20,
  },
  cardEyebrow: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginTop: 6,
  },
});
