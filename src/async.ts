import { store, Store } from './store';

type AsyncFunction = (...args: any[]) => Promise<any>;

interface CallableFn<CallableType extends AsyncFunction> {
  (...params: Parameters<CallableType>): Promise<ReturnType<CallableType>>;
}

export interface Async<CallableType extends AsyncFunction> extends CallableFn<CallableType> {
  $isPending: Store<boolean>;
}

export function async<CallableType extends AsyncFunction>(callable: CallableType): Async<CallableType> {
  const isPending = store(false);

  const callFn: CallableFn<CallableType> = async (...params: Parameters<CallableType>) => {
    if (isPending.get()) {
      return;
    }
    isPending.set(true);

    const result = await callable(...params);

    isPending.set(false);
    return result;
  };

  return Object.assign(callFn, {
    $isPending: store(false),
  });
}
