import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as QuickActions from 'expo-quick-actions';

export function useQuickActions() {
  useEffect(() => {
    QuickActions.setItems([
      {
        id: 'Add a plant',
        title: 'Leaf',
        subtitle: 'Leaf',
        icon: Platform.OS === 'ios' ? 'symbol:leaf' : 'leaf', // <--- 'leaf' here matches the name we provided in the app.config.ts file
      },
    ]);
  }, []);

  return {};
}
