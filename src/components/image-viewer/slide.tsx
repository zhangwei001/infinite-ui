import React, { FC, MutableRefObject, useRef, useState } from 'react'
import { Motion, spring } from "react-motion"
import { rubberbandIfOutOfBounds } from '../../utils/rubberband'
import { useDragAndPinch } from '../../utils/use-drag-and-pinch'
import { bound } from '../../utils/bound'

const classPrefix = `i-image-viewer`

type Props = {
  image: string
  maxZoom: number
  onTap: () => void
  onZoomChange?: (zoom: number) => void
  dragLockRef?: MutableRefObject<boolean>
}

export const Slide: FC<Props> = props => {
  const { dragLockRef } = props
  const controlRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const pinchLockRef = useRef(false)

  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);


  function boundXY([valX, valY]: [number, number], rubberband: boolean) {
    const currentZoom = zoom;
    let xOffset = 0,
      yOffset = 0
    if (imgRef.current && controlRef.current) {
      xOffset =
        ((currentZoom * imgRef.current.width || 0) -
          controlRef.current.clientWidth) /
        2
      yOffset =
        ((currentZoom * imgRef.current.height || 0) -
          controlRef.current.clientHeight) /
        2
    }
    xOffset = xOffset > 0 ? xOffset : 0
    yOffset = yOffset > 0 ? yOffset : 0

    const bounds = {
      left: -xOffset,
      right: xOffset,
      top: -yOffset,
      bottom: yOffset,
    }

    if (rubberband) {
      return [
        rubberbandIfOutOfBounds(valX, bounds.left, bounds.right, currentZoom * 50),
        rubberbandIfOutOfBounds(valY, bounds.top, bounds.bottom, currentZoom * 50),
      ] as const
    } else {
      return [
        bound(valX, bounds.left, bounds.right),
        bound(valY, bounds.top, bounds.bottom),
      ]
    }
  }

  useDragAndPinch(
    {
      onDrag: (state) => {
        if (state.tap && state.elapsedTime > 0 && state.elapsedTime < 1000) {
          // 判断点击时间>0是为了过滤掉非正常操作，例如用户长按选择图片之后的取消操作（也是一次点击）
          props.onTap()
          return
        }
        const currentZoom = zoom;
        if (dragLockRef) {
          dragLockRef.current = currentZoom !== 1
        }
        if (!pinchLockRef.current && currentZoom <= 1) {
          setX(0)
          setY(0)
        } else {
          if (state.last) {
            const [nextX, nextY] = boundXY(
              [
                state.offset[0] + state.velocity[0] * state.direction[0] * 200,
                state.offset[1] + state.velocity[1] * state.direction[1] * 200,
              ],
              false
            )
            setX(nextX)
            setY(nextY)
          } else {
            const [nextX, nextY] = boundXY(state.offset, true)
            setX(nextX)
            setY(nextY)
          }
        }
      },
      onPinch: state => {
        pinchLockRef.current = !state.last
        const [d] = state.offset
        if (d < 0) return
        const nextZoom = state.last ? bound(d, 1, props.maxZoom) : d
        setZoom(nextZoom);
        props.onZoomChange?.(nextZoom)
        if (state.last && nextZoom <= 1) {
          setX(0)
          setY(0)
          if (dragLockRef) {
            dragLockRef.current = false
          }
        } else {
          if (dragLockRef) {
            dragLockRef.current = true
          }
        }
      },
    },
    {
      target: controlRef,
      drag: {
        // filterTaps: true,
        from: () => [x, y],
        pointer: { touch: true },
        eventOptions: { capture: false, passive: false },
        preventDefault: true,
      },
      pinch: {
        from: () => [zoom, 0],
        pointer: { touch: true },
      },
      preventDefault: true,
    }
  )


  return (
    <div
      className={`${classPrefix}-slide`}
      onPointerMove={e => {
        if (zoom !== 1) {
          e.stopPropagation()
        }
      }}
    >
      <div className={`${classPrefix}-control`} ref={controlRef}>
        <Motion
          style={{ x: spring(x), y: spring(y), zoom: spring(zoom) }}
        >
          {interpolatingStyle => <div
            className={`${classPrefix}-image-wrapper`}
            style={{
              transform: `translate(${interpolatingStyle.x}, ${interpolatingStyle.y})`
            }}
          >
            <img
              ref={imgRef}
              src={props.image}
              draggable={false}
              alt={props.image}
            />

          </div>}
        </Motion>
      </div>
    </div>
  )
}
