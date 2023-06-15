import { mergeProps } from '../../utils/with-default-props'
import React, { FC, useEffect, useRef, ReactNode} from 'react'
import { useLockFn, useMemoizedFn } from 'ahooks'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { getScrollParent } from '../../utils/get-scroll-parent'
import Loading from '../loading'
import AriseLoading from '../arise-loading'

function isWindow(element: any | Window): element is Window {
  return element === window
}

const classPrefix = `i-scroll`

export type ScrollProps = {
  loadMore: () => Promise<void>
  hasMore: boolean
  loadingText?: ReactNode
  moreText?: ReactNode
  threshold?: number
  timeout?: number
  type?: string
} & NativeProps

const ScrollContent = ({ hasMore, loadingText, moreText, type }: { hasMore: boolean, loadingText: ReactNode, moreText: ReactNode, type?: string }) => {
  const wrapperClass = type === 'arise' ? AriseLoading : Loading;
  return (
    <>
      {hasMore ? (
        <>
          <wrapperClass.Element
            wrapperClassName='loading'
            iconClassName='loading-icon'
            mask={false}
            visible={hasMore}
          >
            {loadingText ? loadingText : <span className="loading-content">loading more data</span>}
          </wrapperClass.Element>
        </>
      ) : (
        <>
          {moreText ? moreText : <span className="loading-content">no more</span>}
        </>
      )}
    </>
  )
}

export const Scroll: FC<ScrollProps> = p => {
  const props = mergeProps({ threshold: 250, timeout: 500 }, p)

  const doLoadMore = useLockFn(function () {
    return props.loadMore();
  });

  const elementRef = useRef<HTMLDivElement>(null)

  const checkTimeoutRef = useRef<number>()
  const check = useMemoizedFn(() => {
    window.clearTimeout(checkTimeoutRef.current)
    checkTimeoutRef.current = window.setTimeout(() => {
      if (!props.hasMore) return
      const element = elementRef.current
      if (!element) return
      if (!element.offsetParent) return
      const parent = getScrollParent(element)
      if (!parent) return
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const current = isWindow(parent) ? window.innerHeight : parent.getBoundingClientRect().bottom;

      if (current >= elementTop - props.threshold) {
        doLoadMore();
      }
    }, props.timeout)
  })

  useEffect(function () {
    check();
  });

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    const parent = getScrollParent(element)
    if (!parent) return
    function onScroll() {
      check()
    }
    parent.addEventListener('scroll', onScroll)
    return () => {
      parent.removeEventListener('scroll', onScroll)
    }
  }, [])

  return withNativeProps(
    props,
    <div className={classPrefix} ref={elementRef}>
      {props.children && props.children}
      {!props.children && <ScrollContent hasMore={props.hasMore} moreText={props.moreText} loadingText={props.loadingText} type={props.type}  />}
    </div>
  )
}
