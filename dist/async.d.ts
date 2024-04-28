import { Store } from './store';
type AsyncFunction = (...args: any[]) => Promise<any>;
interface CallableFn<CallableType extends AsyncFunction> {
    (...params: Parameters<CallableType>): Promise<ReturnType<CallableType>>;
}
export interface Async<CallableType extends AsyncFunction> extends CallableFn<CallableType> {
    $isPending: Store<boolean>;
}
export declare function async<CallableType extends AsyncFunction>(callable: CallableType): Async<CallableType>;
export {};
