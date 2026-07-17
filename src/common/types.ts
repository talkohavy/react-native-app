import type { ComponentType } from 'react';

export type Route = {
  /**
   * Unique route name, also used as the navigation key.
   */
  name: any;
  /**
   * Title shown in the Home list and in the screen header.
   */
  title: string;
  /**
   * One-line blurb shown under the title in the Home list.
   */
  description: string;
  /**
   * Emoji shown as the icon for this entry.
   */
  emoji: string;
  component: ComponentType;
  /**
   * Deep-link path segment, e.g. `'books'` → `reactnativeapp://books`.
   * Omit for screens that should not be deep-linkable.
   */
  path: string;
  /**
   * @default false
   */
  headerShown?: boolean;
  /**
   * @default true
   */
  showAsLink?: boolean;
};
