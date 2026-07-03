import { StyleSheet, Text, View } from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';

const CHIPS = ['⚡ 60 FPS', '🧬 Reanimated 4', '🤏 Gesture Handler', '🎨 Live Gradients'];

export function StatChips() {
  return (
    <View style={styles.row}>
      {CHIPS.map((chip, index) => (
        <Animated.View key={chip} entering={BounceIn.delay(300 + index * 140).duration(700)} style={styles.chip}>
          <Text style={styles.chipText}>{chip}</Text>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
