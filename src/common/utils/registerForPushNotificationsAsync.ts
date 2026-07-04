import { Platform } from 'react-native';
import Constants from 'expo-constants';
import {
  setNotificationChannelAsync,
  AndroidImportance,
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
} from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.error('Permission not granted to get push token for push notification!');
    return null;
  }

  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

  if (!projectId) throw new Error('Project ID not found');

  const { data: pushTokenString } = await getExpoPushTokenAsync({ projectId });

  console.log(pushTokenString);

  return pushTokenString;
}
