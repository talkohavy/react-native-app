import type { ImageContentFit } from 'expo-image';

export type ContentFitOption = {
  label: string;
  value: ImageContentFit;
};

export const contentFitOptions: ContentFitOption[] = [
  { label: 'Cover', value: 'cover' },
  { label: 'Contain', value: 'contain' },
  { label: 'Fill', value: 'fill' },
  { label: 'None', value: 'none' },
];

export type CachePolicy = 'none' | 'disk' | 'memory' | 'memory-disk';

export type CachePolicyOption = {
  label: string;
  value: CachePolicy;
};

export const cachePolicyOptions: CachePolicyOption[] = [
  { label: 'None', value: 'none' },
  { label: 'Disk', value: 'disk' },
  { label: 'Memory', value: 'memory' },
  { label: 'Memory+Disk', value: 'memory-disk' },
];
