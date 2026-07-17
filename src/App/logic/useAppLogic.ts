import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useQuickActions } from '@src/hooks/useQuickActions';

export function useAppLogic() {
  useQuickActions();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return null;
}
