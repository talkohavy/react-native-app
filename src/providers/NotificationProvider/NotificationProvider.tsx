import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  type EventSubscription,
  type Notification,
} from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../../common/utils/registerForPushNotificationsAsync';
import { NotificationContext, type NotificationContextValue } from './NotificationContext';

type NotificationProviderProps = PropsWithChildren;

export default function NotificationProvider(props: NotificationProviderProps) {
  const { children } = props;

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(setExpoPushToken).catch(setError);

    notificationListener.current = addNotificationReceivedListener((newNotification: Notification) => {
      console.log('new notification received:', newNotification);
      setNotification(newNotification);
    });

    responseListener.current = addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const value: NotificationContextValue = useMemo(
    () => ({ expoPushToken, notification, error }),
    [expoPushToken, notification, error],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
