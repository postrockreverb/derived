import { StoreType } from './store';
import { ObservableType } from './observable';
export interface DerivedType<StoreType> extends ObservableType<StoreType> {
}
type ValueGetter<T> = (get: <Target>(a: StoreType<Target>) => Target) => T | Promise<T>;
export declare function derived<T>(valueGetter: ValueGetter<T>): DerivedType<T>;
export {};
