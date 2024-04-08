import { Store } from './store';

export interface Derived<StoreType> {
  get: () => StoreType;
  subscribe: (callback: (newValue: StoreType) => void) => () => void;
}

type ValueGetter<StoreType> = (get: <Target>(a: Store<Target>) => Target) => StoreType | Promise<StoreType>;

export function derived<StoreType>(valueGetter: ValueGetter<StoreType>): Derived<StoreType> {
  let value: StoreType = null as StoreType;

  const subscribers = new Set<(newValue: StoreType) => void>();
  const subscribed = new Set<Store<any>>();

  function get<Target>(store: Store<Target>) {
    let currentValue = store.get();
    if (!subscribed.has(store)) {
      subscribed.add(store);
      store.subscribe(function (newValue) {
        if (currentValue === newValue) return;
        currentValue = newValue;
        void computeValue();
      });
    }
    return currentValue;
  }

  async function computeValue() {
    const newValue = valueGetter(get);
    if (newValue instanceof Promise) {
      value = await newValue;
    } else {
      value = newValue;
    }
    subscribers.forEach((callback) => callback(value));
  }

  void computeValue();

  return {
    get: () => value,
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
  };
}
