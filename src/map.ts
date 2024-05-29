import { ObservableType } from './observable';
import { observer } from './observer';
import { store, StoreType } from './store';

type MapValue<K extends keyof any, V> = Record<K, V>;

type MapItemStore<V> = StoreType<V | undefined>;

export interface MapType<K extends keyof any, V> extends ObservableType<Map<K, StoreType<V | undefined>>> {
  item: (key?: K | null | undefined) => MapItemStore<V>;
  has: (key: K) => boolean;
  set: (key: K, value: V) => void;
  delete: (key: K) => void;
}

export function map<K extends keyof any, V>(initialValue?: MapValue<K, V>): MapType<K, V> {
  type ItemStore = MapItemStore<V>;
  type ItemValue = V | undefined;

  const _observer = observer<Map<K, ItemStore>>();
  const undefinedStore = store<ItemValue>(undefined);

  const map = new Map<K, ItemStore>();
  if (initialValue) {
    for (let key in initialValue) {
      const value = store<ItemValue>(initialValue[key]);
      map.set(key, value);
    }
  }

  return {
    get: () => map,
    item: (key?: K | null | undefined) => {
      if (key === null || key === undefined) {
        return undefinedStore;
      }
      let valueStore = map.get(key);
      if (valueStore === undefined) {
        valueStore = store<ItemValue>(undefined);
        map.set(key, valueStore);
      }
      return valueStore;
    },
    has: (key: K) => map.has(key),
    set: (key: K, value: V) => {
      const valueStore = map.get(key);
      if (valueStore === undefined) {
        map.set(key, store<ItemValue>(value));
        _observer.notify(map);
        return;
      }
      if (valueStore.get() !== value) {
        valueStore.set(value);
        _observer.notify(map);
        return;
      }
    },
    delete: (key: K) => map.delete(key),
    subscribe: _observer.subscribe,
  };
}
