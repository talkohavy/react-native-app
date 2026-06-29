import { Text, View, StyleSheet } from 'react-native';
import { Theme } from '../common/constants';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Expo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.light.colors.base_0,
  },
  text: {
    color: Theme.light.colors.base_100,
    fontSize: Theme.fontSizes.xl_8,
    fontWeight: 'semibold',
  },
});
