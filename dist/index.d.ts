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

type AsyncFunction = (...args: any[]) => Promise<any>;
interface CallableFn<CallableType extends AsyncFunction> {
    (...params: Parameters<CallableType>): Promise<ReturnType<CallableType>>;
}
interface Async<CallableType extends AsyncFunction> extends CallableFn<CallableType> {
    $isPending: Store<boolean>;
}
declare function async<CallableType extends AsyncFunction>(callable: CallableType): Async<CallableType>;

declare function useStore<StoreType>(store: Store<StoreType> | Derived<StoreType>): StoreType;

export { Async, Derived, Store, async, derived, store, useStore };
