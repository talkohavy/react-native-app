import { Text } from 'react-native';

type TabIconProps = {
  focused: boolean;
  emoji?: string;
};

function TabIcon(props: TabIconProps) {
  const { focused, emoji } = props;

  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>;
}

export function createTabIcon(emoji: string) {
  return (props: TabIconProps) => <TabIcon {...props} emoji={emoji} />;
}
