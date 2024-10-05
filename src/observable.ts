import { SubscribeFn } from './observer';

export interface ObservableType<T> {
  get: () => T;
  subscribe: SubscribeFn<T>;
}
