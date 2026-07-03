import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuroraBackground } from './components/AuroraBackground';
import { ConfettiButton } from './components/ConfettiButton';
import { FlipCard } from './components/FlipCard';
import { StatChips } from './components/StatChips';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { TiltCard } from './components/TiltCard';
import { PALETTES } from './palettes';

export default function ShowcaseScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const paletteIndex = useSharedValue(0);
  const activePalette = PALETTES[activeIndex];

  const selectPalette = (index: number) => {
    setActiveIndex(index);
    paletteIndex.value = withTiming(index, { duration: 500 });
  };

  const cyclePalette = () => {
    selectPalette((activeIndex + 1) % PALETTES.length);
  };

  return (
    <View style={styles.root}>
      <StatusBar style='light' />
      <AuroraBackground paletteIndex={paletteIndex} />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(600).springify()} style={styles.header}>
            <Text style={styles.eyebrow}>WELCOME TO THE</Text>
            <Text style={styles.title}>✨ Showcase</Text>
            <Text style={styles.subtitle}>A little playground of gradients, gestures and motion.</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(150).duration(600)} style={styles.section}>
            <Text style={styles.sectionLabel}>Pick a vibe</Text>
            <ThemeSwitcher activeIndex={activeIndex} onSelect={selectPalette} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(250).duration(600)} style={styles.section}>
            <TiltCard activePalette={activePalette} onSwipedAway={cyclePalette} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(350).duration(600)} style={styles.section}>
            <StatChips />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(450).duration(600)} style={styles.section}>
            <Text style={styles.sectionLabel}>Tap to flip</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flipRow}>
              <FlipCard
                colors={[activePalette.accent, activePalette.accent2]}
                frontEmoji='🧬'
                frontLabel='Reanimated'
                backLabel='Runs animations on the UI thread at native speed.'
              />
              <FlipCard
                colors={[activePalette.accent2, activePalette.accent]}
                frontEmoji='🤏'
                frontLabel='Gestures'
                backLabel='Pan, drag & tilt powered by Gesture Handler.'
              />
              <FlipCard
                colors={[activePalette.accent, activePalette.accent2]}
                frontEmoji='🎨'
                frontLabel='Gradients'
                backLabel='Colors morph live using interpolateColor.'
              />
            </ScrollView>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(550).duration(600)} style={styles.footer}>
            <ConfettiButton
              label='Celebrate'
              colors={[activePalette.accent, activePalette.accent2]}
              onPress={cyclePalette}
            />
            <Text style={styles.footerHint}>Tap for confetti · flings the card to shuffle colors</Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f0c29',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
    gap: 28,
  },
  header: {
    alignItems: 'center',
    marginTop: 12,
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
    marginTop: 6,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
  },
  section: {
    alignItems: 'center',
    gap: 14,
    width: '100%',
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  flipRow: {
    gap: 14,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  footer: {
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  footerHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
  },
});
