import { useCallback, useState } from 'react';
import type { CachePolicy } from '../../../types';

export function useCachePolicyDemoLogic() {
  const [cachePolicy, setCachePolicy] = useState<CachePolicy>('disk');
  const [reloadCount, setReloadCount] = useState(0);

  const forceReload = useCallback(() => {
    setReloadCount((count) => count + 1);
  }, []);

  return {
    cachePolicy,
    setCachePolicy,
    reloadCount,
    forceReload,
  };
}
