import { useCallback, useState } from 'react';

const heroPhotos = [
  'https://picsum.photos/seed/expo-image-1/1200/1200',
  'https://picsum.photos/seed/expo-image-2/1200/1200',
  'https://picsum.photos/seed/expo-image-3/1200/1200',
  'https://picsum.photos/seed/expo-image-4/1200/1200',
];

export function useHeroTransitionDemoLogic() {
  const [heroIndex, setHeroIndex] = useState(0);

  const onNext = useCallback(() => {
    setHeroIndex((current) => (current + 1) % heroPhotos.length);
  }, []);

  return {
    uri: heroPhotos[heroIndex],
    onNext,
  };
}
