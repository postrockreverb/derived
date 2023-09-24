export interface Store<StoreType> {
  get: () => StoreType;
  set: (newValue: StoreType) => void;
  subscribe: (callback: (newValue: StoreType) => void) => () => void;
}

export function store<StoreType>(initialValue: StoreType): Store<StoreType> {
  let value: StoreType = initialValue;

  const subscribers = new Set<(newValue: StoreType) => void>();

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      subscribers.forEach((callback) => callback(value));
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
  };
}
