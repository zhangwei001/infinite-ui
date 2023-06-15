import React, { FC, useEffect, useRef } from 'react'
import { useInViewport } from 'ahooks'

type Props = {
  onActive: () => void
}

export const LazyDetector: FC<Props> = props => {
  const eleRef = useRef<HTMLDivElement>(null)
  const [inViewport] = useInViewport(eleRef)

  useEffect(() => {

    if (inViewport) {
      props.onActive()
    }
  }, [inViewport])

  return <div ref={eleRef} style={{ backgroundColor: 'red'}} />
}
