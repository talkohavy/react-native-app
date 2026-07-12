import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import SuspenseUntilReady from './components/SuspenseUntilReady';
import NotificationProvider from './providers/NotificationProvider';
import { routesObj } from './routes';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';

// Keep the native splash screen up until our own JS content (the LoadingSpinner) is
// ready to paint, so there's no flash of blank white between native launch and JS mount.
SplashScreen.preventAutoHideAsync();

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerTintColor: '#8A5CF6',
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: { headerShown: false },
    },
    ...routesObj,
  },
});

export type TypeOfRootStack = typeof RootStack;

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SuspenseUntilReady asyncFn={asyncFn} Loader={<LoadingScreen />}>
        <NotificationProvider>
          <Navigation />
        </NotificationProvider>
      </SuspenseUntilReady>
    </GestureHandlerRootView>
  );
}

async function asyncFn() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
