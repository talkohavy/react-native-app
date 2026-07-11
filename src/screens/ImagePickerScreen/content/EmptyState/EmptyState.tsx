import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ACCENT, ACCENT_LIGHT, BG } from '../ImageDetails/logic/constants';

type EmptyStateProps = {
  onPickImage: () => void;
  isLoading: boolean;
};

export default function EmptyState(props: EmptyStateProps) {
  const { onPickImage, isLoading } = props;

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.duration(700).springify()} style={styles.inner}>
        <View style={styles.iconRing}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🖼️</Text>
          </View>
        </View>

        <Text style={styles.title}>No Image Selected</Text>
        <Text style={styles.subtitle}>Browse your photo library to pick an image and see its details.</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.buttonWrapper}>
        <Pressable
          onPress={onPickImage}
          disabled={isLoading}
          style={({ pressed }) => [styles.button, (pressed || isLoading) && styles.buttonPressed]}
        >
          {isLoading ? (
            <ActivityIndicator color='#FFFFFF' size='small' />
          ) : (
            <>
              <Text style={styles.buttonIcon}>📂</Text>
              <Text style={styles.buttonText}>Browse Gallery</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.hint}>Your images stay private — nothing is uploaded.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 40,
  },
  inner: {
    alignItems: 'center',
    gap: 16,
  },
  iconRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: ACCENT_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 52,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 260,
  },
  buttonWrapper: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    gap: 10,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  hint: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
