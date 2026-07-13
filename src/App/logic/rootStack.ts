import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routesObj } from '@src/routes';
import HomeScreen from '@src/screens/HomeScreen';

export const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerTintColor: '#8A5CF6',
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: { headerShown: false },
      linking: { path: '' },
    },
    ...routesObj,
  },
});

export type TypeOfRootStack = typeof RootStack;
