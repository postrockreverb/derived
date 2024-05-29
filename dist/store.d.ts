import { ObservableType } from './observable';
export interface StoreType<StoreType> extends ObservableType<StoreType> {
    set: (newValue: StoreType) => void;
}
export declare function store<T>(initialValue: T): StoreType<T>;
