import { FC } from 'react'
import { assign, assignWith, isUndefined, omit } from 'lodash-es'

export function withDefaultProps<D>(defaultProps: D) {
  return function <P>(C: FC<P & typeof defaultProps>) {
    C.defaultProps = defaultProps
    return C as FC<P>
  }
}

export function mergeProps<P, D>(defaultProps: D, props: P): P & D {
  function customizer(objValue: any, srcValue: any) {
    return isUndefined(srcValue) ? objValue : srcValue
  }
  return assignWith(assign({}, defaultProps), props, customizer)
}

export function omitProps<P>(props: P, fields: any){
  return omit(assign({}, props), fields);
}