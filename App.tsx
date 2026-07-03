import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import AboutScreen from './src/screens/AboutScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShowcaseScreen from './src/screens/ShowcaseScreen';

const RootTabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#8A5CF6',
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: { title: 'Home', tabBarIcon: createTabIcon('🏠') },
    },
    Showcase: {
      screen: ShowcaseScreen,
      options: { title: 'Showcase', tabBarIcon: createTabIcon('✨') },
    },
    About: {
      screen: AboutScreen,
      options: { title: 'About', tabBarIcon: createTabIcon('ℹ️') },
    },
  },
});

const Navigation = createStaticNavigation(RootTabs);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

import { createTabIcon } from './src/components/TabIcon/TabIcon';
// figure this out later
import type { StaticParamList } from '@react-navigation/native';

type RootStackParamList = StaticParamList<typeof RootTabs>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      _no_key: never;
    }
  }
}
