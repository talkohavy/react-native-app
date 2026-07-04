import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@src/common/constants';
import { routesArr } from '@src/routes';
import { useHomeScreenLogic } from './logic/useHomeScreenLogic';
import { getItemName } from './logic/utils/getItemName';

export default function HomeScreen() {
  const { renderItem } = useHomeScreenLogic();

  return (
    <View style={styles.container}>
      <FlatList
        data={routesArr}
        keyExtractor={getItemName}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Playground</Text>
            <Text style={styles.subtitle}>Pick a screen to open</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.light.colors.base_0,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  header: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  title: {
    color: Theme.light.colors.base_100,
    fontSize: Theme.fontSizes.xl_3,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Theme.light.colors.base_60,
    fontSize: Theme.fontSizes.sm,
    marginTop: 4,
  },
});
