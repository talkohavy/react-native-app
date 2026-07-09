import { useEffect, useState } from 'react';
import { useCounterStore } from './useCounterStore';

export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(useCounterStore.persist.hasHydrated);

  useEffect(() => {
    const unsubscribe = useCounterStore.persist.onFinishHydration(() => setHasHydrated(true));

    setHasHydrated(useCounterStore.persist.hasHydrated());

    return unsubscribe;
  }, []);

  return hasHydrated;
}
