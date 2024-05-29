import { StoreType } from './store';
import { observer } from './observer';
import { ObservableType } from './observable';

export interface DerivedType<StoreType> extends ObservableType<StoreType> {}

type ValueGetter<T> = (get: <Target>(a: StoreType<Target>) => Target) => T | Promise<T>;

export function derived<T>(valueGetter: ValueGetter<T>): DerivedType<T> {
  const _observer = observer<T>();

  let value: T = null as T;

  const subscribed = new Set<StoreType<any>>();

  function get<Target>(store: StoreType<Target>) {
    let currentValue = store.get();
    if (!subscribed.has(store)) {
      subscribed.add(store);
      store.subscribe(function (newValue) {
        if (currentValue === newValue) {
          return;
        }
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
    _observer.notify(value);
  }

  void computeValue();

  return {
    get: () => value,
    subscribe: _observer.subscribe,
  };
}
