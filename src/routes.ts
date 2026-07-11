import AboutScreen from './screens/AboutScreen';
import CameraScreen from './screens/CameraScreen';
import ExpoImageScreen from './screens/ExpoImageScreen';
import FormScreen from './screens/FormScreen';
import HomeScreen from './screens/HomeScreen';
import ImagePickerScreen from './screens/ImagePickerScreen';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import ModalScreen from './screens/ModalScreen';
import PushNotificationsScreen from './screens/PushNotificationsScreen';
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
  {
    name: 'Home',
    title: 'Home',
    description: 'Home',
    emoji: '🏠',
    component: HomeScreen,
    headerShown: false,
    showAsLink: false,
  },
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
    headerShown: true,
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
  {
    name: 'Modal',
    title: 'Modal',
    description: 'Custom Modal component: basic, action sheet & confirm dialog',
    emoji: '🪟',
    component: ModalScreen,
  },
  {
    name: 'Form',
    title: 'Form',
    description: 'Basic form with string and number inputs',
    emoji: '📝',
    component: FormScreen,
  },
  {
    name: 'Camera',
    title: 'Camera',
    description: 'Take a photo with your device camera',
    emoji: '📷',
    component: CameraScreen,
  },
  {
    name: 'ImagePicker',
    title: 'Image Picker',
    description: 'Pick an image and inspect its metadata',
    emoji: '🖼️',
    component: ImagePickerScreen,
  },
];

export const routesObj = Object.fromEntries(
  routesArr.map((screen) => {
    const { name, title, description, emoji, component, headerShown = false } = screen;

    return [
      name,
      {
        screen: component,
        options: {
          title,
          headerShown,
          description,
          emoji,
        },
      },
    ];
  }),
);
