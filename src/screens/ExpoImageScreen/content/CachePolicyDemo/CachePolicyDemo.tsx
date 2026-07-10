import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Theme } from '@src/common/constants';
import { cachePolicyOptions } from '../../types';
import SegmentedControl from '../SegmentedControl';
import ActionButton from './content/ActionButton';
import { useCachePolicyDemoLogic } from './logic/useCachePolicyDemoLogic';

const cachedPhotoUri = 'https://picsum.photos/seed/expo-image-cache/900/900';
const maxLogEntries = 4;

export default function CachePolicyDemo() {
  const { cachePolicy, setCachePolicy, reloadCount, forceReload } = useCachePolicyDemoLogic();

  const [log, setLog] = useState<string[]>([]);

  const appendLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLog((current) => [`${timestamp} — ${message}`, ...current].slice(0, maxLogEntries));
  }, []);

  const handlePrefetch = useCallback(async () => {
    const didSucceed = await Image.prefetch(cachedPhotoUri, cachePolicy === 'none' ? 'disk' : cachePolicy);

    appendLog(didSucceed ? 'Prefetched into cache ✅' : 'Prefetch failed ❌');
  }, [appendLog, cachePolicy]);

  const handleClearMemory = useCallback(async () => {
    await Image.clearMemoryCache();

    appendLog('Memory cache cleared');
  }, [appendLog]);

  const handleClearDisk = useCallback(async () => {
    await Image.clearDiskCache();

    appendLog('Disk cache cleared');
  }, [appendLog]);

  const handleReload = useCallback(() => {
    forceReload();
    appendLog('Reload triggered');
  }, [appendLog, forceReload]);

  const recyclingKey = `${cachePolicy}-${reloadCount}`;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={cachedPhotoUri}
        cachePolicy={cachePolicy}
        recyclingKey={recyclingKey}
        contentFit='cover'
        transition={300}
      />

      <SegmentedControl options={cachePolicyOptions} selected={cachePolicy} onSelect={setCachePolicy} />

      <View style={styles.actionsRow}>
        <ActionButton label='Prefetch' onPress={handlePrefetch} />
        <ActionButton label='Reload' onPress={handleReload} />
        <ActionButton label='Clear memory' onPress={handleClearMemory} />
        <ActionButton label='Clear disk' onPress={handleClearDisk} />
      </View>

      {log.length > 0 && (
        <View style={styles.log}>
          {log.map((entry) => (
            <Text key={entry} style={styles.logEntry}>
              {entry}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.light.colors.base_10,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  log: {
    gap: Theme.spacing.xs,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    backgroundColor: Theme.light.colors.base_10,
  },
  logEntry: {
    fontSize: Theme.fontSizes.xxs,
    color: Theme.light.colors.base_70,
  },
});
