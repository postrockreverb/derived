import { Store } from './store';
import { Derived } from './derived';
export declare function useStore<StoreType>(store: Store<StoreType> | Derived<StoreType>): StoreType;
