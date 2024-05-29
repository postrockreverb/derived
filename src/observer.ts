export type UpdateFn<T> = (newValue: T) => void;

export type CleanUpCb = () => void;
export type SubscribeFn<T> = (callback: UpdateFn<T>) => CleanUpCb;

export interface Observer<T> {
  notify: UpdateFn<T>;
  subscribe: SubscribeFn<T>;
}

export function observer<T>(): Observer<T> {
  const subscribers = new Set<(newValue: T) => void>();
  return {
    notify: (newValue: T) => {
      subscribers.forEach((callback) => callback(newValue));
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
  };
}
