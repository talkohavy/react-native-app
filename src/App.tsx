import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import HomeScreen from './screens/HomeScreen';

const experimentRoutes = Object.fromEntries(
  Routes.map((screen) => [screen.name, { screen: screen.component, options: { title: screen.title } }]),
);

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
    ...experimentRoutes,
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
