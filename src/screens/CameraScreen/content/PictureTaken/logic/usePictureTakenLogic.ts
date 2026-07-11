import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { MAX_SCALE, MIN_SCALE } from './constants';
import { clamp } from './utils/clamp';

export function usePictureTakenLogic() {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  // eslint-disable-next-line new-cap -- Gesture.Pinch is a builder factory, not a constructor
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const newScale = Math.min(Math.max(savedScale.value * event.scale, MIN_SCALE), MAX_SCALE);
      scale.value = newScale;
      translateX.value = clamp(translateX.value, containerWidth.value, newScale);
      translateY.value = clamp(translateY.value, containerHeight.value, newScale);
    })
    .onEnd(() => {
      savedScale.value = scale.value;

      if (scale.value <= MIN_SCALE) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        const clampedX = clamp(translateX.value, containerWidth.value, scale.value);
        const clampedY = clamp(translateY.value, containerHeight.value, scale.value);
        translateX.value = withSpring(clampedX);
        translateY.value = withSpring(clampedY);
        savedTranslateX.value = clampedX;
        savedTranslateY.value = clampedY;
      }
    });

  // eslint-disable-next-line new-cap -- Gesture.Pan is a builder factory, not a constructor
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const rawX = savedTranslateX.value + event.translationX;
      const rawY = savedTranslateY.value + event.translationY;
      translateX.value = clamp(rawX, containerWidth.value, scale.value);
      translateY.value = clamp(rawY, containerHeight.value, scale.value);
    })
    .onEnd(() => {
      if (scale.value <= MIN_SCALE) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
      }
    });

  // eslint-disable-next-line new-cap -- Gesture.Tap is a builder factory, not a constructor
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(MIN_SCALE);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      savedScale.value = MIN_SCALE;
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    });

  // eslint-disable-next-line new-cap -- Gesture.Exclusive / Gesture.Simultaneous are builder factories, not constructors
  const composedGesture = Gesture.Exclusive(doubleTapGesture, Gesture.Simultaneous(pinchGesture, panGesture));

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
  }));

  return {
    containerWidth,
    containerHeight,
    composedGesture,
    animatedImageStyle,
  };
}
