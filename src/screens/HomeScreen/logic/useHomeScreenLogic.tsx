import { useNavigation } from '@react-navigation/native';
import ScreenLink from '../content';
import type { Route } from '@src/common/types';

export function useHomeScreenLogic() {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Route }) => {
    const onLinkClick = () => navigation.navigate(item.name);

    // biome-ignore lint/performance/noJsxPropsBind: no
    return <ScreenLink item={item} onPress={onLinkClick} />;
  };

  return { renderItem };
}
