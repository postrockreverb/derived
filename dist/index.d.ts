interface Store<StoreType> {
    get: () => StoreType;
    set: (newValue: StoreType) => void;
    subscribe: (callback: (newValue: StoreType) => void) => () => void;
}
declare function store<StoreType>(initialValue: StoreType): Store<StoreType>;

interface Derived<StoreType> {
    get: () => StoreType;
    subscribe: (callback: (newValue: StoreType) => void) => () => void;
}
type ValueGetter<StoreType> = (get: <Target>(a: Store<Target>) => Target) => StoreType | Promise<StoreType>;
declare function derived<StoreType>(valueGetter: ValueGetter<StoreType>): Derived<StoreType>;

declare function useStore<StoreType>(store: Store<StoreType> | Derived<StoreType>): StoreType;

export { Derived, Store, derived, store, useStore };
