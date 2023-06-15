import React, { CSSProperties, ReactElement, useRef, useState, useEffect, ReactNode, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import Scroll from '../scroll'
import throttle from './throttle'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { getScrollParent } from '../../utils/get-scroll-parent'

const classPrefix = `i-list`
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 100;

export type ListProps = {
  innerStyle?: CSSProperties
  loadMore?: () => Promise<void>
  hasMore?: boolean
  loadingText?: ReactNode
  moreText?: ReactNode
  threshold?: number,
  timeout?: number,
  children?: ReactElement | ReactElement[],
  scrollEventThrottle?: number,
  onScroll?: Function
  type?:string
} & NativeProps<
  '--prefix-width' | '--item-padding' | '--align-items'
> 

export type ListRef = {
  resetLoadMore?: () => void,
}

const defaultProps = {
  mode: 'default',
  hasMore: false,
  scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE
}

export const List = forwardRef<ListRef, ListProps>((p: ListProps, ref) => {
  const props = mergeProps(defaultProps, p)

  const [refresh, setRefresh] = useState(false);

  const listRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const handleScroll = (e?: any, rect?: object) => {
    props.onScroll && props.onScroll(e, rect)
  }

  const resetLoadMore = () => {
    setRefresh(true)
  }

  useEffect(() => {
    const element = listRef.current
    if (!element) return
    const parent = getScrollParent(element)
    if (!parent) return
    const rect = element.getBoundingClientRect();
    parent.addEventListener('scroll', throttle((e?: any) => handleScroll(e, rect), props.scrollEventThrottle))
  })

  useEffect(() => {
    if(refresh) {
      setRefresh(false)
    }
  }, [refresh])

  useImperativeHandle(ref, () => ({
    resetLoadMore
  }));

  return withNativeProps(
    props,
    <div ref={listRef} className={classNames(classPrefix)}>
      {refresh ? <div></div> : (
      <div>
        <div ref={contentRef} className={`${classPrefix}-inner`} style={props.innerStyle}>{props.children}</div>
        {props.loadMore ? <Scroll loadMore={props.loadMore} hasMore={props.hasMore} loadingText={props.loadingText} moreText={props.moreText} timeout={props.timeout} type={props.type} />: null}
      </div>
      )}
    </div>
  )
})
