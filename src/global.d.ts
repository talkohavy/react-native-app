import type { StaticParamList } from '@react-navigation/native';
import type { RootStack } from './App';

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      _no_key: never;
    }
  }
}
