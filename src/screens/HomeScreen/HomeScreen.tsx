import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../common/constants';

export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToAbout = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Expo.</Text>

      <Pressable onPress={navigateToAbout}>
        <Text style={Theme.light.link}>About</Text>
      </Pressable>
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
