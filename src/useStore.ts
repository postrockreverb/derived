import { useSyncExternalStore } from 'react';
import { Store } from './store';
import { Derived } from './derived';

export function useStore<StoreType>(store: Store<StoreType> | Derived<StoreType>) {
  return useSyncExternalStore(store.subscribe, store.get);
}
