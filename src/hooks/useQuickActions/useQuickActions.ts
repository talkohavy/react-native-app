import { useEffect } from 'react';
import * as QuickActions from 'expo-quick-actions';
import { useQuickActionCallback } from 'expo-quick-actions/hooks';
import { navigationRef } from '@src/navigation/navigationRef';
import { ACTIONS } from './logic/constants';

export function useQuickActions() {
  useEffect(() => {
    QuickActions.setItems(ACTIONS);
  }, []);

  useQuickActionCallback((action) => {
    const screen = action.params?.screen as any;

    if (!screen || !navigationRef.isReady()) return;

    navigationRef.navigate(screen);
  });

  return null;
}
