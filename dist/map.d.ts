import { StoreType } from './store';
type MapValue<K extends keyof any, V> = Record<K, V>;
type MapItemStore<V> = StoreType<V | undefined>;
export interface MapType<K extends keyof any, V> {
    item: (key?: K | null | undefined) => MapItemStore<V>;
}
export declare function map<K extends keyof any, V>(initialValue?: MapValue<K, V>): MapType<K, V>;
export {};
