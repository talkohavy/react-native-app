import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export function useAppLogic() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return null;
}
