
function noop() {}

const isFunction = (val: unknown): val is Function =>
typeof val === 'function';

const isObject = (val: unknown): val is Record<any, any> =>
val !== null && typeof val === 'object';

const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch);

export type Interceptor = (
  ...args: any[]
) => Promise<boolean> | boolean | undefined;

export function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
  }: {
    args?: unknown[];
    done: () => void;
    canceled?: () => void;
  }
) {
  if (interceptor) {
    const returnVal = interceptor.apply(null, args);

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done();
          } else if (canceled) {
            canceled();
          }
        })
        .catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}
