# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **Expo has changed.** This project is on **Expo SDK 56 / React Native 0.85 / React 19.2**. APIs differ significantly from older SDKs. Read the versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing native/Expo code — do not rely on memory of older Expo versions.

## Package manager

Uses **pnpm** (pinned `pnpm@11.5.2` via `packageManager`) — run `pnpm install`, not `npm`. EAS builds enable corepack so they use this exact pinned version.

## Commands

```bash
pnpm start            # expo start (dev server / Metro)
pnpm android          # expo start --android
pnpm ios              # expo start --ios
pnpm web              # expo start --web
pnpm run:android      # expo run:android (native build + run)

pnpm tsc              # typecheck (tsc -p tsconfig.json, no emit)
pnpm lint             # eslint
pnpm lint:fix         # eslint --fix
pnpm format:fix       # biome format --write ./src
pnpm format:prettier  # prettier --check

pnpm build:apk        # eas build --platform android --profile production
pnpm submit:play-store
```

`eas` is not a local dependency — install it globally (`brew install eas-cli`) or use `npx`.

### Testing

There is **no working test setup**: `pnpm test` runs `jest`, but jest is not installed and no test files exist. Likewise `reset-project` points at a nonexistent `./scripts/`. These are leftover starter-template scripts — don't assume they run.

## Tooling: three separate tools

Linting/formatting is split across three configs — know which does what:

- **ESLint** (`eslint.config.mjs`) — the primary linter. Heavy use of `eslint-plugin-perfectionist` for **import ordering** (internal pattern is `^@src/.+`, so `@src/*` imports form their own group). `react-compiler` and `react-hooks` rules are on. Many stylistic `error` rules (no-else-return, no-nested-ternary, object-shorthand, etc.).
- **Biome** (`biome.json`) — linter with `preset: "all"` (scoped to `src`), plus `pnpm format`. Import organizing is **off** (ESLint/perfectionist owns that). Code uses `// biome-ignore ...` comments.
- **Prettier** (`.prettierrc.mjs`) — formatting: single quotes, 2-space indent, `printWidth: 120`, trailing commas `all`, `arrowParens: "always"` (must stay — it interacts with ESLint arrow rules).

`printWidth`/line length (120) must stay in sync between Prettier and ESLint.

## Architecture

Entry: `src/index.ts` → `registerRootComponent(App)` → `src/App.tsx`. (Not Expo Router / file-based routing, despite README mentioning it — this app uses React Navigation's **static** API.)

### Navigation — static config + a route registry

- `src/App.tsx` builds a `createNativeStackNavigator({...})` with `Home` as the initial route, then spreads `routesObj` from `src/routes.ts`. It's wrapped in `createStaticNavigation` and rendered inside `GestureHandlerRootView` → `SuspenseUntilReady` → `NotificationProvider`.
- **`src/routes.ts` is the single source of truth for every screen.** `routesArr` (typed `Route[]`) drives both the Home list UI and the navigator. **To add a screen:** build it under `src/screens/<Name>/`, then add one entry to `routesArr` — it auto-appears in the Home list and becomes navigable. No other wiring.
- Route-name type safety flows through `src/global.d.ts`, which augments `ReactNavigation.RootParamList` from `TypeOfRootStack` (exported by `App.tsx`). This is what makes `navigation.navigate('Showcase')` type-check against the actual route set.

### Screen folder convention

Each screen under `src/screens/<Name>/` follows:

- `<Name>.tsx` — the presentational component (JSX + `StyleSheet.create`).
- `index.ts` — re-export (`export { default } from './<Name>'`).
- `logic/use<Name>Logic.tsx` — a hook holding handlers/`renderItem`/state, keeping the component declarative.
- `logic/hooks/`, `logic/utils/` — sub-hooks and pure helpers.
- `content/` — child components specific to that screen.

Keep component files thin; put behavior in the `logic/` hook. See `HomeScreen` and `ShoppingListScreen` as the reference examples.

### State (Zustand + persistence)

- `src/store/` holds Zustand stores. `useCounterStore.ts` uses the `persist` middleware with `createJSONStorage(() => AsyncStorage)`.
- **AsyncStorage keys live centrally in `src/common/constants/asyncStorageKeys.ts`** (`AsyncStorageKeys`) — reference these, don't hardcode key strings.
- Persisted stores rehydrate asynchronously. Use the `useHasHydrated()` hook (`src/store/useHasHydrated.ts`) to gate rendering on hydration and avoid flashing pre-hydration values.

### Startup / splash

`SplashScreen.preventAutoHideAsync()` holds the native splash; `App` hides it on mount and `SuspenseUntilReady` (`src/components/SuspenseUntilReady`) runs an async gate before showing content, falling back to `<LoadingScreen />`.

### Notifications

`src/providers/NotificationProvider/` wraps the app, registers for push (`registerForPushNotificationsAsync`), and exposes `expoPushToken` / `notification` / `error` via context. `expo-notifications` is configured as a plugin in `app.config.ts`.

### Config & aliases

- Native/Expo config is **`app.config.ts`** (TypeScript, dynamic), not `app.json`. React Compiler is enabled via `experiments.reactCompiler: true`. Android package / iOS bundle id: `com.luckylove.reactnativeapp`; owner `luckylove`.
- Path aliases (`tsconfig.json`): `@src/*` → `./src/*`, `@/assets/*` → `./assets/*`. The `example/` dir is excluded from typecheck and is starter reference material, not app code.
