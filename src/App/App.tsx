import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStaticNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import SuspenseUntilReady from '../components/SuspenseUntilReady';
import { navigationRef } from '../navigation/navigationRef';
import NotificationProvider from '../providers/NotificationProvider';
import LoadingScreen from '../screens/LoadingScreen';
import { RootStack } from './logic/rootStack';
import { useAppLogic } from './logic/useAppLogic';
import { onAppLoading } from './logic/utils/onAppLoading';

// Keep the native splash screen up until our own JS content (the LoadingSpinner) is
// ready to paint, so there's no flash of blank white between native launch and JS mount.
SplashScreen.preventAutoHideAsync();

const Navigation = createStaticNavigation(RootStack);

const linking = { prefixes: ['reactnativeapp://'] };

export default function App() {
  useAppLogic();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SuspenseUntilReady asyncFn={onAppLoading} Loader={<LoadingScreen />}>
        <NotificationProvider>
          <Navigation ref={navigationRef} linking={linking} />
        </NotificationProvider>
      </SuspenseUntilReady>
    </GestureHandlerRootView>
  );
}
