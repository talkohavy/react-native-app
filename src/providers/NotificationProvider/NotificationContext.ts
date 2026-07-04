import { createContext, useContext } from 'react';
import type { Notification } from 'expo-notifications';

export type NotificationContextValue = {
  expoPushToken: string | null;
  notification: Notification | null;
  error: Error | null;
};

const INITIAL_STATE = {} as NotificationContextValue;

export const NotificationContext = createContext<NotificationContextValue>(INITIAL_STATE);
export const useNotification = () => useContext(NotificationContext);
