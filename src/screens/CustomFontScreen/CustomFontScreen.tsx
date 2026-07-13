import { Text, View, StyleSheet } from 'react-native';
import { Theme } from '../../common/constants';

export default function CustomFontScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lucky Love</Text>
      <Text style={styles.text}>Custom Font</Text>
      <Text style={styles.text}>Master</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.light.colors.base_0,
  },
  text: {
    letterSpacing: 1,
    color: Theme.light.colors.base_100,
    fontSize: Theme.fontSizes.xl_8,
    fontWeight: 'semibold',
    fontFamily: 'Matemasie_400Regular',
  },
});
