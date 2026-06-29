import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          headerTitle: 'Home',
        }}
      />

      <Stack.Screen
        name='about'
        options={{
          headerShown: true,
          headerTitle: 'About',
          headerLeft: () => <></>, // <--- in order to hide the back button, render this.
        }}
      />
    </Stack>
  );
}
