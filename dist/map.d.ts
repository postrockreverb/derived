import { ObservableType } from './observable';
import { StoreType } from './store';
type MapValue<K extends keyof any, V> = Record<K, V>;
type MapItemStore<V> = StoreType<V | undefined>;
export interface MapType<K extends keyof any, V> extends ObservableType<Map<K, StoreType<V | undefined>>> {
    item: (key?: K | null | undefined) => MapItemStore<V>;
    has: (key: K) => boolean;
    set: (key: K, value: V) => void;
    delete: (key: K) => void;
}
export declare function map<K extends keyof any, V>(initialValue?: MapValue<K, V>): MapType<K, V>;
export {};
