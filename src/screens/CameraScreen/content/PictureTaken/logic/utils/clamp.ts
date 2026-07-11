export function clamp(value: number, containerSize: number, currentScale: number): number {
  'worklet';
  const maxTranslate = (containerSize * (currentScale - 1)) / 2;

  return Math.min(Math.max(value, -maxTranslate), maxTranslate);
}
