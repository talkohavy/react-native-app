import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'ReactNativeApp',
  slug: 'react-native-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  /**
   * The scheme looks like this: reactnativeapp://...
   * It looks similar to `http://`, `mailto:` or `tel:`.
   * A link to the app will look like this: reactnativeapp://...
   * This is called an "intent filter" in Android.
   * It doesn't have to be unique to the app, as you might already know from http:// urls,
   * where the phone asks you which browser you want to open it with.
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
          image: './assets/images/splash.png',
          imageWidth: 76,
        },
      },
    ],
    // fonts
    [
      'expo-font',
      {
        fonts: ['node_modules/@expo-google-fonts/matemasie/400Regular/Matemasie_400Regular.ttf'],
      },
    ],
    [
      'expo-quick-actions',
      {
        androidIcons: {
          leaf: {
            foregroundImage: './assets/images/react-logo.png',
            backgroundColor: '#208AEF',
          },
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
