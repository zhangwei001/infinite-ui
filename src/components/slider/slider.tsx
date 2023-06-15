import React, { CSSProperties, ReactNode, forwardRef, useMemo, ReactElement, useImperativeHandle, useRef, useState, useEffect, useLayoutEffect } from 'react'
import classNames from 'classnames'
import { Motion, spring } from "react-motion"
import { useDrag } from '@use-gesture/react'
import PageIndicator, { PageIndicatorProps } from '../page-indicator'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { bound } from '../../utils/bound'
import { useRefState } from '../../utils/use-ref-state'
import { transform } from 'lodash'

const classPrefix = 'i-slider'

export type SliderRef = {
  sliderTo: (index: number) => void
  sliderNext: () => void
  sliderPrev: () => void
}

export type SliderProps = {
  width?: number | string
  height?: number | string
  defaultIndex?: number
  autoplay?: boolean
  autoplayInterval?: number
  allowTouchMove?: boolean
  onIndexChange?: (index: number) => void
  onLastIndexChange?: (index: number) => void
  loop?: boolean
  direction?: 'horizontal' | 'vertical'
  showIndicator?: boolean
  indicator?: (total: number, current: number) => ReactNode
  slideSize?: number
  trackOffset?: number
  stuckAtBoundary?: boolean
  indicatorProps?: Pick<PageIndicatorProps, 'color' | 'style' | 'className'>
  children?: ReactElement | ReactElement[]
} & NativeProps<
  | '--height'
  | '--width'
  | '--slider-width'
  | '--slider-height'
  | '--border-radius'
  | '--track-padding'
  | '--track-offset'
>


const defaultProps = {
  defaultIndex: 0,
  autoplay: false,
  autoplayInterval: 3000,
  allowTouchMove: true,
  loop: true,
  direction: 'horizontal',
  slideSize: 100,
  trackOffset: 0,
  stuckAtBoundary: false
}

export const Slider = forwardRef<SliderRef, SliderProps>(
  (p: SliderProps, ref) => {
    const props = mergeProps(defaultProps, p)
    const isVertical = props.direction === 'vertical'
    const slideRatio = props.slideSize / 100
    const offsetRatio = props.trackOffset / 100

    const { validChildren, count } = useMemo(() => {
      let cnt = 0
      const validChildrenArr = React.Children.map(props.children, child => {
        if (!React.isValidElement(child)) return null
        cnt++
        return child
      })
      return {
        validChildren: validChildrenArr,
        count: cnt,
      }
    }, [props.children])

    if (count === 0 || !validChildren) {
      return null
    }
    if (count === 0) {
      return null
    }
    let { loop, autoplay, autoplayInterval } = props
    if (slideRatio * (count - 1) < 1) {
      loop = false
    }
    const trackRef = useRef<HTMLDivElement>(null)

    function getSlidePixels() {
      const track = trackRef.current
      if (!track) return 0
      const trackPixels = isVertical ? track.offsetHeight : track.offsetWidth
      return (trackPixels * props.slideSize) / 100

    }

    const [current, setCurrent] = useState(props.defaultIndex)
    const [dragging, setDragging, draggingRef] = useRefState(false)
    function boundIndex(currentVal: number) {
      let min = 0
      let max = count - 1
      if (props.stuckAtBoundary) {
        min += (1 - slideRatio - offsetRatio) / slideRatio
        max -= (1 - slideRatio - offsetRatio) / slideRatio
      }
      return bound(currentVal, min, max)
    }


    const [position, setPosition] = useState(bound(current, 0, count - 1) * 100)
    const [active, setActive] = useState(true);

    const onRest = () => {
      if (draggingRef.current) return
      const rawX = position
      const totalWidth = 100 * count
      const standardPosition = modulus(rawX, totalWidth)
      if (standardPosition === rawX) return
      setActive(false)
      setPosition(standardPosition)
      setActive(true)
      return
    }

    const bind = useDrag(
      state => {
        const slidePixels = getSlidePixels()
        if (!slidePixels) return
        const paramIndex = isVertical ? 1 : 0
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
          sliderTo(bound(index, minIndex, maxIndex))

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
          if (loop) return {}
          const slidePixels = getSlidePixels()
          const lowerBound = boundIndex(0) * slidePixels
          const upperBound = boundIndex(count - 1) * slidePixels
          return isVertical
            ? {
              top: lowerBound,
              bottom: upperBound,
            }
            : {
              left: lowerBound,
              right: upperBound,
            }
        },
        axis: isVertical ? 'y' : 'x',
        preventScroll: !isVertical,
        pointer: {
          touch: true,
        },
      }
    )

    function sliderTo(index: number, immediate = false) {
      if (loop) {
        const i = modulus(index, count)
        setCurrent(i)
        props.onIndexChange?.(i)
        setPosition(index * 100)

      } else {
        const i = bound(index, 0, count - 1)
        setCurrent(i)
        props.onIndexChange?.(i)
        if (index === (count - 1)) {
          props.onLastIndexChange?.(index)
        }
        setPosition(boundIndex(i) * 100)

      }
    }

    function sliderNext() {
      sliderTo(Math.round(position / 100) + 1)

    }
    function sliderPrev() {
      sliderTo(Math.round(position / 100) - 1)
    }
    useImperativeHandle(ref, () => ({
      sliderTo,
      sliderNext,
      sliderPrev,
    }))

    const useIsomorphicLayoutEffect = window.__isSSR ? useEffect : useLayoutEffect;
    useIsomorphicLayoutEffect(() => {
      const maxIndex = validChildren.length - 1
      if (current > maxIndex) {
        sliderTo(maxIndex, true)
      }
    })

    useEffect(() => {
      if (!autoplay || dragging) return
      const interval = window.setInterval(() => {
        sliderNext()
      }, autoplayInterval)
      return () => {
        window.clearInterval(interval)
      }
    }, [autoplay, autoplayInterval, dragging, position])

    const renderIndicator = () => {
      return props.indicator === undefined ? (
        <div className='i-slider-indicator'>
          <PageIndicator
            {...props.indicatorProps}
            total={count}
            current={current}
            direction={props.direction}
          />
        </div>
      ) : (
        props.indicator(count, current)
      )
    }
    const style: CSSProperties &
      Record<'--slider-width' | '--track-offset', string> = {
      '--slider-width': `${props.slideSize}%`,
      '--track-offset': `${props.trackOffset}%`,
    }
    return withNativeProps(
      props,
      <div className={classNames(`${classPrefix}`, `${classPrefix}-${props.direction}`)} style={style}>
        <div ref={trackRef}
          className={classNames(`${classPrefix}-block`, {
            'i-slider-block-allow-touch-move': props.allowTouchMove,
          })}
          onClickCapture={e => {
            if (draggingRef.current) {
              e.stopPropagation()
            }
          }}
          {...(props.allowTouchMove ? bind() : {})}>
          <div
            className={`${classPrefix}-block-inner`}
          >
            {React.Children.map(validChildren, (child, index) => {
              return (
                <Motion
                  style={{ position: !active ? position : spring(position) }}
                  onRest={onRest}
                >
                  {interpolatingStyle => {
                    let positionVal;

                    let finalPosition = -interpolatingStyle.position + index * 100
                    if (loop) {
                      const totalWidth = count * 100
                      const flagWidth = totalWidth / 2 - 10
                      finalPosition =
                        modulus(finalPosition + flagWidth, totalWidth) -
                        flagWidth
                    }
                    positionVal = `${finalPosition}%`

                    const transformVal = isVertical ? `translateY(${positionVal})` : `translateX(${positionVal})`

                    return (<div
                      className='i-slider-slide'
                      style={{
                        transform: transformVal,
                        left: `-${index * 100}%`,
                      }}
                    >
                      {child}
                    </div>)
                  }
                  }
                </Motion>
              )
            })}
          </div>
        </div>
        {props.showIndicator && renderIndicator()}
      </div>
    )
  }
)

function modulus(value: number, division: number) {
  const remainder = value % division
  return remainder < 0 ? remainder + division : remainder
}
