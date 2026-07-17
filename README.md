# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with `[create-expo-app](https://www.npmjs.com/package/create-expo-app)`.

## 1. Prerequisites

1. Install `Android Studio` (and create a Virtual Device under `Virtual Device Manager`)
2. Install `eas` (run `brew install eas-cli`)
3. Install `Java`
4. Install `Orbit` (run `brew install expo-orbit`)

---

## 2. Get started

1. Run the following command

```bash
 pnpm run:android
```

If you haven't ran `pnpm install`, it will run it for you (you will see `node_modules` folder get created).
If you haven't ran `expo prebuild`, it will run it for you (you will see `android` folder get created).

When the menu pops up, hit `a`, which would launch the android simulator.

---

## 3. Run on your android phone

1. Turn on **Developer options**
2. Turn on **Wireless debugging**
3. Pair your phone with your mac pc
4. Run `pnpm start` while your phone screen is on.

---

## 4. Quick Actions

You can test your app opens using this:

```bash
npx uri-scheme open reactnativeapp:// --android
```

You can even select a specific page:

```bash
npx uri-scheme open reactnativeapp://books --android
```
