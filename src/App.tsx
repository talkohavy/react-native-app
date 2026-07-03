import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import HomeScreen from './screens/HomeScreen';

const experimentRoutes = Object.fromEntries(
  Routes.map((screen) => [screen.name, { screen: screen.component, options: { title: screen.title } }]),
) as unknown as ExperimentRoutes;

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

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

import type { StaticParamList } from '@react-navigation/native';
import type { ExperimentRoutes } from './common/types';

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      _no_key: never;
    }
  }
}
