import { store, StoreType } from './store';

type AsyncFunction = (...args: any[]) => Promise<any>;

interface CallableFn<CallableType extends AsyncFunction> {
  (...params: Parameters<CallableType>): Promise<ReturnType<CallableType>>;
}

export interface AsyncType<CallableType extends AsyncFunction> extends CallableFn<CallableType> {
  $isPending: StoreType<boolean>;
}

export function async<CallableType extends AsyncFunction>(callable: CallableType): AsyncType<CallableType> {
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
    $isPending: isPending,
  });
}
