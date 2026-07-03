export type Palette = {
  name: string;
  background: readonly [string, string, string];
  accent: string;
  accent2: string;
};

export const PALETTES: readonly Palette[] = [
  {
    name: 'Aurora',
    background: ['#0f0c29', '#302b63', '#24243e'],
    accent: '#8A5CF6',
    accent2: '#22D3EE',
  },
  {
    name: 'Sunset',
    background: ['#1a1a2e', '#8e2de2', '#ff512f'],
    accent: '#FF7A59',
    accent2: '#FFD166',
  },
  {
    name: 'Ocean',
    background: ['#020024', '#0f2027', '#00c9a7'],
    accent: '#00E5C7',
    accent2: '#4CC9F0',
  },
  {
    name: 'Candy',
    background: ['#3a1c71', '#d76d77', '#ffaf7b'],
    accent: '#FF6FB5',
    accent2: '#FFD36E',
  },
] as const;
