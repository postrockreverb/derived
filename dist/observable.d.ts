import { SubscribeFn } from './observer';
export interface ObservableType<T> {
    get: () => T;
    subscribe: SubscribeFn<T>;
}
export declare function useObservable<T>(store: ObservableType<T>): T;
