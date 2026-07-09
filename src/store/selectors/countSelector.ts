import type { CounterState } from '../useCounterStore';

export const countSelector = (state: CounterState) => state.count;

export const incrementSelector = (state: CounterState) => state.increment;

export const decrementSelector = (state: CounterState) => state.decrement;

export const resetSelector = (state: CounterState) => state.reset;
