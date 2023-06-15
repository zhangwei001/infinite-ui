
export default function throttle(func: { apply: (arg0: any, arg1: any) => any; }, wait: number) {
    let ctx: null, args: IArguments | null, rtn: any, timeoutID: number | NodeJS.Timeout;
    let last = 0;
  
    function call() {
      timeoutID = 0;
      last = +new Date();
      rtn = func.apply(ctx, args);
      ctx = null;
      args = null;
    }
  
    return function throttled() {
      ctx = this;
      args = arguments;
      const delta = new Date().getTime() - last;
      if (!timeoutID)
        if (delta >= wait) call();
        else timeoutID = setTimeout(call, wait - delta);
      return rtn;
    };
}