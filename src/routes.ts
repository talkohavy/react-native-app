import AboutScreen from './screens/AboutScreen';
import ShowcaseScreen from './screens/ShowcaseScreen';
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
export const Routes: Route[] = [
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
];
