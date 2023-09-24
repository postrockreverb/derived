import { Store } from './store';
export interface Derived<StoreType> {
    get: () => StoreType;
    subscribe: (callback: (newValue: StoreType) => void) => () => void;
}
type ValueGetter<StoreType> = (get: <Target>(a: Store<Target>) => Target) => StoreType | Promise<StoreType>;
export declare function derived<StoreType>(valueGetter: ValueGetter<StoreType>): Derived<StoreType>;
export {};
