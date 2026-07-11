import { View, StyleSheet } from 'react-native';
import { Theme } from '@src/common/constants';

export default function NoContent() {
  return <View style={styles.flex} />;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Theme.light.colors.black,
  },
});
