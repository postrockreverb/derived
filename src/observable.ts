import { useSyncExternalStore } from 'react';
import { SubscribeFn } from './observer';

export interface ObservableType<T> {
  get: () => T;
  subscribe: SubscribeFn<T>;
}

export function useObservable<T>(store: ObservableType<T>) {
  return useSyncExternalStore(store.subscribe, store.get);
}
