import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useGesture, useDrag } from '@use-gesture/react'
import { Motion, spring } from "react-motion"

import { Slide } from './slide'
import { convertPx } from '../../utils/convert-px'
import { bound } from '../../utils/bound'

const classPrefix = `i-image-viewer`

export type SlidesType = {
  images: string[]
  onTap: () => void
  maxZoom: number
  defaultIndex: number
  onEndChange?: (movePercent: number) => void
  onIndexChange?: (index: number) => void
}
export type SlidesRef = {
  swipeTo: (index: number, immediate?: boolean) => void
}

export const Slides = forwardRef<SlidesRef, SlidesType>((props, ref) => {
  const { onEndChange } = props
  let movePercent = 0

  const slideWidth = window.innerWidth + convertPx(16)

  const [x, setX] = useState(props.defaultIndex * slideWidth);

  const count = props.images.length

  function swipeTo(index: number, immediate = false) {
    const i = bound(index, 0, count - 1)
    props.onIndexChange?.(i)
    setX(i * slideWidth)
  }

  useImperativeHandle(ref, () => ({
    swipeTo,
  }))

  const dragLockRef = useRef(false)
  const bind = useGesture({
    onDrag: state => {
      if (dragLockRef.current) return
      const [offsetX] = state.offset

      if (state.last) {
        const minIndex = Math.floor(offsetX / slideWidth)
        const maxIndex = minIndex + 1
        const velocityOffset =
          Math.min(state.velocity[0] * 2000, slideWidth) * state.direction[0]
        swipeTo(
          bound(
            Math.round((offsetX + velocityOffset) / slideWidth),
            minIndex,
            maxIndex
          )
        )
      } else {
        const minIndex = Math.floor(offsetX / slideWidth)
        const maxIndex = minIndex + 1
        if (maxIndex === count) {
          const moveX = offsetX % slideWidth
          movePercent = moveX / slideWidth
        }
        setX(offsetX)
      }
    },
    onDragEnd: state => {
      const [offsetX] = state.offset
      const minIndex = Math.floor(offsetX / slideWidth)
      const maxIndex = minIndex + 1
      if (maxIndex === count) {
        onEndChange && onEndChange(movePercent)
      }
    },

  }, {
    preventDefault: true,
    drag: {
      transform: ([coordinateX, coordinateY]) => [-coordinateX, -coordinateY],
      from: () => [x, 0],
      bounds: () => {
        return {
          left: 0,
          right: (count - 1) * slideWidth,
        }
      },
      rubberband: true,
      axis: 'x',
      pointer: { touch: true },
    }
  })



  return (
    <div className={`${classPrefix}-slides`} {...bind()}>
      <Motion style={{ x: spring(x) }}>
        {interpolatingStyle => {
          const index: number = bound(Math.round(interpolatingStyle.x / slideWidth), 0, count - 1)
          
          return (
            <div className={`${classPrefix}-indicator`}>
              {`${index + 1} / ${count}`}
            </div>)
        }
        }


      </Motion>
      <Motion style={{ x: spring(x) }}>
        {interpolatingStyle => {
        return (
        <div
          className={`${classPrefix}-slides-inner`}
          style={{  transform: `translateX(-${interpolatingStyle.x}px)`,
        }}
        >
          {props.images.map(image => (
            <Slide
              key={image}
              image={image}
              onTap={props.onTap}
              maxZoom={props.maxZoom}
              onZoomChange={zoom => {
                if (zoom !== 1) {
                  const index: number = Math.round(x / slideWidth)
                  setX(index * slideWidth)
                }
              }}
              dragLockRef={dragLockRef}
            />
          ))}
        </div>
        )}
        }
      </Motion>
    </div>
  )
})
