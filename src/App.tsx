import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { allRoutes } from './routes';
import HomeScreen from './screens/HomeScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerTintColor: '#8A5CF6',
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: { title: 'Playground' },
    },
    ...allRoutes,
  },
});

export type TypeOfRootStack = typeof RootStack;

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
