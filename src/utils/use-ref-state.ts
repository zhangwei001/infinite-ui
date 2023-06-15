import { useLayoutEffect, useEffect, useRef, useState } from 'react'

export function useRefState<T>(initialState: T | (() => T)) {
  const [state, setState] = useState<T>(initialState)
  const ref = useRef<T>(state)
  const useIsomorphicLayoutEffect = window.__isSSR ? useEffect : useLayoutEffect;
  useIsomorphicLayoutEffect(() => {
    ref.current = state
  }, [state])
  return [state, setState, ref] as const
}
