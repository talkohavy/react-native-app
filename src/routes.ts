import BookDetailScreen from './screens/BookDetailScreen';
import BooksScreen from './screens/BooksScreen';
import CameraScreen from './screens/CameraScreen';
import CustomFontScreen from './screens/CustomFontScreen';
import ExpoImageScreen from './screens/ExpoImageScreen';
import FormScreen from './screens/FormScreen';
// import HomeScreen from './screens/HomeScreen';
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
  /**
   * If enbaled, causes circular dependency:
   *
   * > Require cycle: src/routes.ts -> src/screens/HomeScreen/index.ts -> src/screens/HomeScreen/HomeScreen.tsx -> src/routes.ts
   */
  // {
  //   name: 'Home',
  //   title: 'Home',
  //   description: 'Home',
  //   emoji: '🏠',
  //   component: HomeScreen,
  //   headerShown: false,
  //   showAsLink: false,
  // },
  {
    name: 'Books',
    title: 'My Books',
    description: 'Browse and manage your book collection',
    emoji: '📚',
    component: BooksScreen,
    headerShown: false,
    path: 'books',
  },
  {
    name: 'BookDetail',
    title: 'Book Detail',
    description: 'Book Detail',
    emoji: '📚',
    component: BookDetailScreen,
    headerShown: true,
    showAsLink: false,
    path: 'book-detail',
  },
  {
    name: 'Showcase',
    title: 'Showcase',
    description: 'Gradients, gestures & motion playground',
    emoji: '✨',
    component: ShowcaseScreen,
    path: 'showcase',
  },
  {
    name: 'Custom Font',
    title: 'Custom Font',
    description: 'Hot to use custom font in your app',
    emoji: 'ℹ️',
    component: CustomFontScreen,
    headerShown: true,
    path: 'custom-font',
  },
  {
    name: 'ShoppingList',
    title: 'Shopping List',
    description: 'Add & remove items from your list',
    emoji: '🛒',
    component: ShoppingListScreen,
    path: 'shopping-list',
  },
  {
    name: 'PushNotifications',
    title: 'Push Notifications',
    description: 'Send push notifications',
    emoji: '📱',
    component: PushNotificationsScreen,
    path: 'push-notifications',
  },
  {
    name: 'Loading',
    title: 'Loading',
    description: 'Loading screen',
    emoji: '🔄',
    component: LoadingScreen,
    path: 'loading',
  },
  {
    name: 'ZustandCounter',
    title: 'Zustand Counter',
    description: 'Zustand store persisted with AsyncStorage',
    emoji: '🐻',
    component: ZustandCounterScreen,
    path: 'zustand-counter',
  },
  {
    name: 'ExpoImage',
    title: 'Expo Image',
    description: 'Placeholders, transitions & caching with expo-image',
    emoji: '🖼️',
    component: ExpoImageScreen,
    path: 'expo-image',
  },
  {
    name: 'Modal',
    title: 'Modal',
    description: 'Custom Modal component: basic, action sheet & confirm dialog',
    emoji: '🪟',
    component: ModalScreen,
    path: 'modal',
  },
  {
    name: 'Form',
    title: 'Form',
    description: 'Basic form with string and number inputs',
    emoji: '📝',
    component: FormScreen,
    path: 'form',
  },
  {
    name: 'Camera',
    title: 'Camera',
    description: 'Take a photo with your device camera',
    emoji: '📷',
    component: CameraScreen,
    path: 'camera',
  },
  {
    name: 'ImagePicker',
    title: 'Image Picker',
    description: 'Pick an image and inspect its metadata',
    emoji: '🖼️',
    component: ImagePickerScreen,
    path: 'image-picker',
  },
];

export const routesObj = Object.fromEntries(
  routesArr.map((screen) => {
    const { name, title, description, emoji, component, headerShown = false, path } = screen;

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
        linking: { path },
      },
    ];
  }),
);
