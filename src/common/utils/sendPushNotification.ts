type SendPushNotificationProps = {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
};

export async function sendPushNotification(props: SendPushNotificationProps) {
  const { token, title = 'Original Title', body = 'And here is the body!', data } = props;

  const message = {
    to: token,
    title,
    body,
    data,
    sound: 'default',
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
