import { observer } from './observer';
import { store, StoreType } from './store';

type MapValue<K extends keyof any, V> = Record<K, V>;

type MapItemStore<V> = StoreType<V | undefined>;

export interface MapType<K extends keyof any, V> {
  item: (key?: K | null | undefined) => MapItemStore<V>;
}

export function map<K extends keyof any, V>(initialValue?: MapValue<K, V>): MapType<K, V> {
  type ItemStore = MapItemStore<V>;
  type ItemValue = V | undefined;

  const _observer = observer<Map<K, ItemStore>>();

  const undefinedStore = store<ItemValue>(undefined);

  const map = new Map<K, ItemStore>();

  const addStore = (key: K, value: ItemValue): ItemStore => {
    const valueStore = store<ItemValue>(value);
    map.set(key, valueStore);
    return valueStore;
  };

  const getStore = (key: K): ItemStore => {
    const valueStore = map.get(key);
    if (valueStore === undefined) {
      return addStore(key, undefined);
    }
    return valueStore;
  };

  for (let key in initialValue) {
    addStore(key, initialValue[key]);
  }

  return {
    item: (key?: K | null | undefined) => {
      if (key === null || key === undefined) {
        return undefinedStore;
      }
      const valueStore = getStore(key);
      return {
        set: (newValue) => {
          if (valueStore.get() === newValue) {
            return;
          }
          valueStore.set(newValue);
          _observer.notify(new Map(map));
        },
        get: valueStore.get,
        subscribe: valueStore.subscribe,
      };
    },
  };
}
