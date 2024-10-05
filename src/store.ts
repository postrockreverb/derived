import { observer } from './observer';
import { ObservableType } from './observable';

export interface StoreType<StoreType> extends ObservableType<StoreType> {
  set: (newValue: StoreType) => void;
  update: (updater: (value: StoreType) => StoreType) => void;
}

export function store<T>(initialValue: T): StoreType<T> {
  const _observer = observer<T>();

  let value: T = initialValue;

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      _observer.notify(value);
    },
    update: (updater) => {
      value = updater(value);
      _observer.notify(value);
    },
    subscribe: _observer.subscribe,
  };
}
