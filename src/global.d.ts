import type { StaticParamList } from '@react-navigation/native';
import type { TypeOfRootStack } from './App';

type RootStackParamList = StaticParamList<TypeOfRootStack>;

declare global {
  // biome-ignore lint/style/noNamespace: no
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
