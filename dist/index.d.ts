type UpdateFn<T> = (newValue: T) => void;
type CleanUpCb = () => void;
type SubscribeFn<T> = (callback: UpdateFn<T>) => CleanUpCb;

interface ObservableType<T> {
    get: () => T;
    subscribe: SubscribeFn<T>;
}
declare function useObservable<T>(store: ObservableType<T>): T;

interface StoreType<StoreType> extends ObservableType<StoreType> {
    set: (newValue: StoreType) => void;
}
declare function store<T>(initialValue: T): StoreType<T>;

interface DerivedType<StoreType> extends ObservableType<StoreType> {
}
type ValueGetter<T> = (get: <Target>(a: StoreType<Target>) => Target) => T | Promise<T>;
declare function derived<T>(valueGetter: ValueGetter<T>): DerivedType<T>;

type AsyncFunction = (...args: any[]) => Promise<any>;
interface CallableFn<CallableType extends AsyncFunction> {
    (...params: Parameters<CallableType>): Promise<ReturnType<CallableType>>;
}
interface AsyncType<CallableType extends AsyncFunction> extends CallableFn<CallableType> {
    $isPending: StoreType<boolean>;
}
declare function async<CallableType extends AsyncFunction>(callable: CallableType): AsyncType<CallableType>;

type MapValue<K extends keyof any, V> = Record<K, V>;
type MapItemStore<V> = StoreType<V | undefined>;
interface MapType<K extends keyof any, V> extends ObservableType<Map<K, StoreType<V | undefined>>> {
    item: (key?: K | null | undefined) => MapItemStore<V>;
    has: (key: K) => boolean;
    set: (key: K, value: V) => void;
    delete: (key: K) => void;
}
declare function map<K extends keyof any, V>(initialValue?: MapValue<K, V>): MapType<K, V>;

export { AsyncType, DerivedType, MapType, ObservableType, StoreType, async, derived, map, store, useObservable };
