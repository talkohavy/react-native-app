import type { CounterState } from '../useCounterStore';

export const favoriteColorSelector = (state: CounterState) => state.favoriteColor;

export const setFavoriteColorSelector = (state: CounterState) => state.setFavoriteColor;
