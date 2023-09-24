export interface Store<StoreType> {
    get: () => StoreType;
    set: (newValue: StoreType) => void;
    subscribe: (callback: (newValue: StoreType) => void) => () => void;
}
export declare function store<StoreType>(initialValue: StoreType): Store<StoreType>;
