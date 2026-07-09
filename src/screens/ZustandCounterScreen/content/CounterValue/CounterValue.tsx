import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import { countSelector } from '@src/store/selectors/countSelector';
import { useCounterStore } from '@src/store/useCounterStore';

export default function CounterValue() {
  const count = useCounterStore(countSelector);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.lg,
  },
  count: {
    fontSize: Theme.fontSizes.xl_12,
    fontWeight: 'bold',
    color: Theme.light.colors.base_100,
  },
});
