import { observer } from './observer';
import { ObservableType } from './observable';

export interface StoreType<StoreType> extends ObservableType<StoreType> {
  set: (newValue: StoreType) => void;
}

export function store<T>(initialValue: T): StoreType<T> {
  const _observer = observer<T>();

  let value: T = initialValue;

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      _observer.notify(newValue);
    },
    subscribe: _observer.subscribe,
  };
}
