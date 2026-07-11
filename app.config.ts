import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'react-native-app',
  slug: 'react-native-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  /**
   * The URL scheme used to deep link into this app (e.g. "reactnativeapp://...").
   * Required for things like OAuth/auth redirects, Expo Linking.createURL, and
   * opening the app from push notifications or other apps. It's a build-time
   * setting (baked into the native project), so it has no effect in Expo Go,
   * and changing it later requires updating Info.plist / AndroidManifest.xml
   * in a bare/prebuilt project.
   */
  scheme: 'reactnativeapp',
  userInterfaceStyle: 'automatic',
  ios: {
    icon: './assets/expo.icon',
    bundleIdentifier: 'com.luckylove.reactnativeapp',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    package: 'com.luckylove.reactnativeapp',
    googleServicesFile: './google-services.json',
    softwareKeyboardLayoutMode: 'resize',
  },
  web: {
    output: 'single',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          // SDK 56 (experimental): precompiled headers for the C++ codegen of
          // every autolinked native module. Biggest win for our heavy native
          // graph (reanimated/worklets/screens) — cuts the CMake compile step.
          usePrecompiledHeaders: true,
        },
      },
    ],
    'expo-notifications',
    [
      'expo-image-picker',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photos to let you pick images.',
        microphonePermission: false,
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera to take photos.',
        microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone.',
        recordAudioAndroid: false,
      },
    ],
    [
      'expo-splash-screen',
      {
        backgroundColor: '#208AEF',
        android: {
          image: './assets/images/splash-icon.png',
          imageWidth: 76,
        },
      },
    ],
  ],
  experiments: {
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: '3b30249e-9dc6-4709-bb4e-24ee1cb10719',
    },
  },
  owner: 'luckylove',
});
