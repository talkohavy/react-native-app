import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import AboutScreen from './src/screens/AboutScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShowcaseScreen from './src/screens/ShowcaseScreen';

const tabIcon = (emoji: string) => (props: { focused: boolean }) => (
  <Text style={{ fontSize: 22, opacity: props.focused ? 1 : 0.5 }}>{emoji}</Text>
);

const RootTabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#8A5CF6',
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: { title: 'Home', tabBarIcon: tabIcon('🏠') },
    },
    Showcase: {
      screen: ShowcaseScreen,
      options: { title: 'Showcase', tabBarIcon: tabIcon('✨') },
    },
    About: {
      screen: AboutScreen,
      options: { title: 'About', tabBarIcon: tabIcon('ℹ️') },
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
