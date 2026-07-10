import AboutScreen from './screens/AboutScreen';
import ExpoImageScreen from './screens/ExpoImageScreen';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import PushNotificationsScreen from './screens/PushNotificationsScreen';
// import HomeScreen from './screens/HomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import ShowcaseScreen from './screens/ShowcaseScreen';
import ZustandCounterScreen from './screens/ZustandCounterScreen';
import type { Route } from './common/types';

/**
 * Single source of truth for every experiment screen in the app.
 *
 * To add a new screen: build it under `src/screens/<YourScreen>`, then add one
 * entry here. It will automatically show up in the Home list and become
 * navigable — no other wiring required.
 *
 * `as const` keeps each `name` a string literal (instead of widening to
 * `string`) so React Navigation can type-check `navigation.navigate(...)`
 * calls against the exact set of route names below.
 */
export const routesArr: Route[] = [
  // {
  //   name: 'Home',
  //   title: 'Home',
  //   description: 'Home',
  //   emoji: '🏠',
  //   component: HomeScreen,
  // },
  {
    name: 'Showcase',
    title: 'Showcase',
    description: 'Gradients, gestures & motion playground',
    emoji: '✨',
    component: ShowcaseScreen,
  },
  {
    name: 'About',
    title: 'About',
    description: 'What this app is about',
    emoji: 'ℹ️',
    component: AboutScreen,
  },
  {
    name: 'ShoppingList',
    title: 'Shopping List',
    description: 'Add & remove items from your list',
    emoji: '🛒',
    component: ShoppingListScreen,
  },
  {
    name: 'PushNotifications',
    title: 'Push Notifications',
    description: 'Send push notifications',
    emoji: '📱',
    component: PushNotificationsScreen,
  },
  {
    name: 'Loading',
    title: 'Loading',
    description: 'Loading screen',
    emoji: '🔄',
    component: LoadingScreen,
  },
  {
    name: 'ZustandCounter',
    title: 'Zustand Counter',
    description: 'Zustand store persisted with AsyncStorage',
    emoji: '🐻',
    component: ZustandCounterScreen,
  },
  {
    name: 'ExpoImage',
    title: 'Expo Image',
    description: 'Placeholders, transitions & caching with expo-image',
    emoji: '🖼️',
    component: ExpoImageScreen,
  },
];

export const allRoutes = Object.fromEntries(
  routesArr.map((screen) => [
    screen.name,
    {
      screen: screen.component,
      options: {
        title: screen.title,
      },
    },
  ]),
);
