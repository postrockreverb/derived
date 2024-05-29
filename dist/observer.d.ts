export type UpdateFn<T> = (newValue: T) => void;
export type CleanUpCb = () => void;
export type SubscribeFn<T> = (callback: UpdateFn<T>) => CleanUpCb;
export interface Observer<T> {
    notify: UpdateFn<T>;
    subscribe: SubscribeFn<T>;
}
export declare function observer<T>(): Observer<T>;
