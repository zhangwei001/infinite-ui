import React, {
  FC,
  ReactNode,
  ReactElement,
  ComponentProps,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import classNames from 'classnames'
import { Motion, spring } from "react-motion"

import { useDrag } from '@use-gesture/react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { bound } from '../../utils/bound'
import { useUpdateLayoutEffect } from 'ahooks'
import { useMutationEffect } from '../../utils/use-mutation-effect'
import { useResizeEffect } from '../../utils/use-resize-effect'
import { useRefState } from '../../utils/use-ref-state'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `i-tabs`
const useIsomorphicUpdateLayoutEffect = window.__isSSR ? useEffect : useUpdateLayoutEffect;

export type TabProps = {
  title: ReactNode
  disabled?: boolean
  forceRender?: boolean
  badge?: {
    content: string
    backgroundColor?: string
  }
} & NativeProps

export const Tab: FC<TabProps> = () => {
  return null
}

export type TabsProps = {
  activeKey?: string | null
  defaultActiveKey?: string | null
  activeLineMode?: 'auto' | 'full' | 'fixed'
  stretch?: boolean
  onChange?: (key: string) => void
  swipeable?: boolean
  hideLine?: boolean
} & NativeProps<
  '--fixed-active-line-width' | '--title-font-size' | '--content-padding'
>

const defaultProps = {
  activeLineMode: 'fixed',
  stretch: true,
  swipeable: false,
  hideLine: false
}

export const Tabs: FC<TabsProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { hideLine } = props;
  const tabListContainerRef = useRef<HTMLDivElement>(null)
  const activeLineRef = useRef<HTMLDivElement>(null)
  const keyToIndexRecord: Record<string, number> = {}
  let firstActiveKey: string | null = null
  const indexToKey: Record<number, string> = {}

  const panes: ReactElement<ComponentProps<typeof Tab>>[] = []

  React.Children.forEach(props.children, (child, index) => {
    if (!React.isValidElement(child)) return
    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    const length = panes.push(child)
    indexToKey[index] = key
    keyToIndexRecord[key] = length - 1
  })

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? firstActiveKey,
    onChange: props.onChange,
  })

  const [x, setX] = useState(0)
  const [width, setWidth] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [init, setInit] = useState(false)

  const [current, setCurrent, currentRef] = useRefState(
    typeof activeKey === 'string' ? keyToIndexRecord[activeKey] : 0
  )
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging, draggingRef] = useRefState(false)

  const [position, setPosition] = useState(props.defaultActiveKey
    ? 100 * keyToIndexRecord[props.defaultActiveKey]
    : 0)
  const onRestPos = () => {
    if (draggingRef.current) return
    const rawX = position
    const totalWidth = 100 * panes.length
    const standardPosition = modulus(rawX, totalWidth)
    if (standardPosition === rawX) return
    setPosition(standardPosition)
  }

  const bind = useDrag(
    state => {
      const slidePixels = getSlidePixels()
      if (!slidePixels) return
      const paramIndex = 0
      const offset = state.offset[paramIndex]
      const direction = state.direction[paramIndex]
      const velocity = state.velocity[paramIndex]
      setDragging(true)
      if (!state.last) {
        setPosition((offset * 100) / slidePixels)

      } else {
        const minIndex = Math.floor(offset / slidePixels)
        const maxIndex = minIndex + 1
        const index = Math.round(
          (offset + velocity * 2000 * direction) / slidePixels
        )
        swipeTo(bound(index, minIndex, maxIndex))
        window.setTimeout(() => {
          setDragging(false)
        })
      }
    },
    {
      transform: ([coordinateX, coordinateY]) => [-coordinateX, -coordinateY],
      from: () => {
        const slidePixels = getSlidePixels()
        return [
          (position / 100) * slidePixels,
          (position / 100) * slidePixels,
        ]
      },
      bounds: () => {
        const slidePixels = getSlidePixels()
        const lowerBound = boundIndex(0) * slidePixels
        const upperBound = boundIndex(panes.length - 1) * slidePixels
        return {
          left: lowerBound,
          right: upperBound,
        }
      },
      axis: 'x',
      pointer: {
        touch: true,
      },
    }
  )

  function swipeTo(index: number, immediate = false) {
    const i = bound(index, 0, panes.length - 1)
    setCurrent(i)

    window.setTimeout(() => {
      if (currentRef.current !== current) {
        setActiveKey(indexToKey[i])
      }
    })
    setPosition(boundIndex(i) * 100)
  }

  function boundIndex(currentVal: number) {
    const min = 0
    const max = panes.length - 1
    return bound(currentVal, min, max)
  }

  function getSlidePixels() {
    const track = trackRef.current
    if (!track) return 0
    return track.offsetWidth
  }

  function animate(immediate = false) {
    const container = tabListContainerRef.current
    if (!container) return
    const activeIndex = keyToIndexRecord[activeKey as string]
    if (activeIndex === undefined && !hideLine) {
      setX(0)
      setWidth(0)
      return
    }
    const activeLine = activeLineRef.current
    if (!activeLine) return

    const activeTabWrapper = container.children.item(
      activeIndex + 1
    ) as HTMLDivElement
    const activeTab = activeTabWrapper.children.item(0) as HTMLDivElement
    const activeTabLeft = activeTab.offsetLeft
    const activeTabWidth = activeTab.offsetWidth
    const activeTabWrapperLeft = activeTabWrapper.offsetLeft
    const activeTabWrapperWidth = activeTabWrapper.offsetWidth

    const containerWidth = container.offsetWidth
    const containerScrollWidth = container.scrollWidth
    const containerScrollLeft = container.scrollLeft
    const activeLineWidth = activeLine.offsetWidth

    let nextLineX = 0
    let nextLineWidth = 0
    if (props.activeLineMode === 'auto') {
      nextLineX = activeTabLeft
      nextLineWidth = activeTabWidth
    } else if (props.activeLineMode === 'full') {
      nextLineX = activeTabWrapperLeft
      nextLineWidth = activeTabWrapperWidth
    } else {
      nextLineX = activeTabLeft + (activeTabWidth - activeLineWidth) / 2
    }
    if (!hideLine) {
      setX(nextLineX)
      setWidth(nextLineWidth)
    }
    const maxScrollDistance = containerScrollWidth - containerWidth
    if (maxScrollDistance <= 0) return

    const nextScrollLeft = bound(
      activeTabLeft - (containerWidth - activeTabWidth) / 2,
      0,
      containerScrollWidth - containerWidth
    )
    if(immediate) setInit(false)
    setScrollLeft(nextScrollLeft)
    setInit(true)
  }
  useIsomorphicUpdateLayoutEffect(() => {
    animate(false)
  }, [activeKey])

  useResizeEffect(() => {
    animate(true)
    if (!init) setInit(true)
  }, tabListContainerRef)

  useMutationEffect(
    () => {
      animate(true)
    },
    tabListContainerRef,
    {
      subtree: true,
      childList: true,
      characterData: true,
    }
  )

  return withNativeProps(
    props,
    <div className={classPrefix}>
      <div
        className={`${classPrefix}-header`}
      style={{overflow: 'hidden'}}
      >
        <Motion style={{ scrollLeft: init ? spring(scrollLeft) : scrollLeft }}>
          {interpolatingStyle => {
            return (
                <div
                  className={classNames(`${classPrefix}-tab-list`, panes.length <= 3 ? `${classPrefix}-tab-regular-padding` : `${classPrefix}-tab-light-padding`, {
                    [`${classPrefix}-tab-bottom-padding-hide`]: hideLine
                  })}
                  ref={tabListContainerRef}
                  style={{
                    transform: `translateX(-${interpolatingStyle.scrollLeft}px)`,
                    overflow: 'visible',
                  }}
                >
                  {!hideLine &&  (

                    <Motion style={{x: init ? spring(x): x}}>
                    { motionStyle => {
                    return (<div
                      ref={activeLineRef}
                      className={classNames(`${classPrefix}-tab-line`, {
                        [`${classPrefix}-tab-line-light`]: panes.length > 3
                      })}
                      style={{
                        width:
                          props.activeLineMode === 'fixed'
                            ? 'var(--fixed-active-line-width, 21px)'
                            : width,
                        transform: `translateX(${motionStyle.x}px)`,
                        visibility: motionStyle.x > 0 ? 'visible' : 'hidden'
                      }}
                    />)}}
                    </Motion>)}

                  {panes.map(pane =>
                    withNativeProps(
                      pane.props,
                      <div
                        key={pane.key}
                        className={classNames(
                          !hideLine ? `${classPrefix}-tab-wrapper` : `${classPrefix}-tab-wrapper-hide`,
                          {
                            [`${classPrefix}-tab-wrapper-stretch`]: props.stretch,
                          })}
                      >
                        <div
                          onClick={() => {
                            const { key } = pane
                            if (pane.props.disabled) return
                            if (key === undefined || key === null) {
                              return
                            }
                            if (props.swipeable) {
                              swipeTo(keyToIndexRecord[key])
                            } else {
                              setActiveKey(key.toString())
                            }
                          }}
                          className={classNames(`${classPrefix}-tab`, {
                            [`${classPrefix}-tab-active`]: pane.key === activeKey,
                            [`${classPrefix}-tab-disabled`]: pane.props.disabled,
                          })}
                        >
                          <div className={`${classPrefix}-tab-title`}>
                            {pane.props.title}
                          </div>
                          {pane.props.badge && (
                            <div
                              className={`${classPrefix}-tab-badge`}
                              style={{
                                backgroundColor: pane.props.badge.backgroundColor
                                  ? pane.props.badge.backgroundColor
                                  : 'var(--i-colour_fill_brand_main)',
                              }}
                            >
                              <span className={`${classPrefix}-tab-badge-text`}>
                                {pane.props.badge.content}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>)
          }}
        </Motion>
      </div>
      {
        props.swipeable ? (
          <div className={`${classPrefix}-wrapper`}>
            <div
              className={`${classPrefix}-tabs-container`}
              ref={trackRef}
              {...bind()}
            >
              {panes.map(pane => {
                if (pane.props.children === undefined) {
                  return null
                }
                return (
                  <Motion style={{ position: init ? spring(position) : position }}
                    onRest={onRestPos}
                    key={pane.key}

                  >
                    {interpolatingStyle => <div
                      style={{
                        transform: `translateX(${-interpolatingStyle.position}%)`
                      }}
                      className={`${classPrefix}-content`}
                    >
                      {pane.props.children}
                    </div>}
                  </Motion>
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            {panes.map(pane => {
              if (pane.props.children === undefined) {
                return null
              }
              if (pane.key === activeKey) {
                return (
                  <div key={pane.key} className={`${classPrefix}-content`}>
                    {pane.props.children}
                  </div>
                )
              }
              if (pane.props.forceRender) {
                return (
                  <div key={pane.key} style={{ display: 'none' }}>
                    {pane.props.children}
                  </div>
                )
              }
              return null
            })}
          </div>
        )
      }
    </div >
  )
}

function modulus(value: number, division: number) {
  const remainder = value % division
  return remainder < 0 ? remainder + division : remainder
}
