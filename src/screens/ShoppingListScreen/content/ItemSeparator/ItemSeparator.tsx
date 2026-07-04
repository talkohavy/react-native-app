import { StyleSheet, View } from 'react-native';
import { Theme } from '@src/common/constants';

export default function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: Theme.spacing.sm,
  },
});
