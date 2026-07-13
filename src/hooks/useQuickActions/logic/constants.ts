import { Platform } from 'react-native';
import type { Action } from 'expo-quick-actions';

export const ACTIONS = [
  {
    id: 'shopping_list',
    title: 'Shopping List',
    subtitle: 'Add items to your list',
    icon: Platform.OS === 'ios' ? 'symbol:cart.fill' : 'shopping_list',
    params: { screen: 'ShoppingList' },
  },
  {
    id: 'showcase',
    title: 'Showcase',
    subtitle: 'Gradients & motion playground',
    icon: Platform.OS === 'ios' ? 'symbol:sparkles' : 'showcase',
    params: { screen: 'Showcase' },
  },
] satisfies Action[];
