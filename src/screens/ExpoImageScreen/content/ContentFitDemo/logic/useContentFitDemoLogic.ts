import { useState } from 'react';
import type { ImageContentFit } from 'expo-image';

export function useContentFitDemoLogic() {
  const [contentFit, setContentFit] = useState<ImageContentFit>('cover');

  return {
    contentFit,
    setContentFit,
  };
}
