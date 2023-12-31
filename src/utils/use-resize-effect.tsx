import { RefObject, useLayoutEffect, useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'

export function useResizeEffect<T extends HTMLElement>(
  effect: (target: T) => void,
  targetRef: RefObject<T>
) {
  const fn = useMemoizedFn(effect)

  const useIsomorphicLayoutEffect = window.__isSSR ? useEffect : useLayoutEffect;
  useIsomorphicLayoutEffect(() => {
    const target = targetRef.current
    if (!target) return
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        fn(target)
      })
      observer.observe(target)
      return () => {
        observer.disconnect()
      }
    } else {
      fn(target)
    }
  }, [targetRef])
}
