import { Text, View, Button } from 'react-native';
import { scheduleNotificationAsync, setNotificationHandler } from 'expo-notifications';
import { sendPushNotification } from '@src/common/utils/sendPushNotification';
import { useNotification } from '@src/providers/NotificationProvider';

setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function PushNotificationsScreen() {
  const { expoPushToken, notification } = useNotification();

  const handleSendPushNotification = async () => {
    if (!expoPushToken) return;

    // Immediate notification:
    await sendPushNotification({ token: expoPushToken, title: 'Test Title', body: 'Test Body' });

    // Scheduled notification:
    scheduleNotificationAsync({
      content: {
        title: 'Test Title',
        body: 'Test Body',
      },
      trigger: {
        channelId: 'default',
        seconds: 5,
      },
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your Expo push token: {expoPushToken}</Text>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification ? notification.request.content.title : null} </Text>
        <Text>Body: {notification ? notification.request.content.body : null}</Text>
        <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : null}</Text>
      </View>

      <Button title='Press to Send Notification' onPress={handleSendPushNotification} />
    </View>
  );
}
