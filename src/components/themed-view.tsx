import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import type { ThemeColor } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView(props: ThemedViewProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style, lightColor, darkColor, type, ...otherProps } = props;

  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}
