import { StoreType } from './store';
type AsyncFunction = (...args: any[]) => Promise<any>;
interface CallableFn<CallableType extends AsyncFunction> {
    (...params: Parameters<CallableType>): Promise<ReturnType<CallableType>>;
}
export interface AsyncType<CallableType extends AsyncFunction> extends CallableFn<CallableType> {
    $isPending: StoreType<boolean>;
}
export declare function async<CallableType extends AsyncFunction>(callable: CallableType): AsyncType<CallableType>;
export {};
