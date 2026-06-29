import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { StackScreen } from 'expo-router/build/layouts/stack-utils';
import { Theme } from '../common/constants';

export default function NotFoundScreen() {
  return (
    <>
      <StackScreen
        options={{
          title: 'Oops! Not Found',
        }}
      />

      <View style={styles.container}>
        <Link href='/' style={Theme.light.link}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
