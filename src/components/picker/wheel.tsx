import React, { ReactNode, memo, useRef, useState } from 'react'
import { Motion, spring } from "react-motion"

import { useDrag } from '@use-gesture/react'
import { useIsomorphicLayoutEffect } from 'ahooks'
import isEqual from 'lodash-es/isEqual';
import { PickerColumnItem, PickerValue } from './types'
import { bound } from '../../utils/bound'
import './picker.less'
import classNames from 'classnames'

const classPrefix = 'i-wheel'
const ITEM_HEIGHT = 41.5;

type WheelProps = {
  index: number
  column: PickerColumnItem[]
  value: PickerValue
  position: 'left' | 'right' | 'center'
  onSelect: (value: PickerValue, index: number) => void
  renderLabel: (item: PickerColumnItem) => ReactNode
  selectedStyle?: React.CSSProperties
  optionLen: number,
  wheelIndex: number
}

export const Wheel = memo<WheelProps>(props => {
  const { column, value, renderLabel, selectedStyle = {}, optionLen, wheelIndex } = props
  const wheelRef = useRef<HTMLDivElement>(null)
  const itemHeight = ITEM_HEIGHT
  const draggingRef = useRef(false)

  function onSelect(val: PickerValue, isLast: boolean) {
    isLast && props.onSelect(val, props.index)
  }
  const [y, setY] = useState(0)

  // 设置默认值
  useIsomorphicLayoutEffect(() => {
    if (draggingRef.current) return
    if (!value) return
    const targetIndex = column.findIndex(item => item.value === value)
    if (targetIndex < 0) return
    const finalPosition = targetIndex * -itemHeight
    setY(finalPosition)
  }, [value, column])

  // 设置默认值
  useIsomorphicLayoutEffect(() => {
    if (column.length === 0) {
      if (value !== null) {
        onSelect(null, true)
      }
    } else {
      if (!column.some(item => item.value === value)) {
        const firstItem = column[0]
        onSelect(firstItem.value, true)
      }
    }
  }, [column, value])

  const scrollSelect = (index: number, isLast: boolean) => {
    const finalPosition = index * -itemHeight
    setY(finalPosition)

    const item = column[index]
    if (!item) return
    onSelect(item.value, isLast)
  }

  const bind = useDrag(({ down, direction: [dirX, dirY], offset: [offsetX, offsetY], last, velocity: [veX, veY], active }) => {
    draggingRef.current = true;
    const min = -((column.length - 1) * itemHeight)
    const max = 0
    if (last) {
      draggingRef.current = false
      const position = offsetY + veY * dirY * 50;
      const targetIndex =
        min < max
          ? -Math.round(bound(position, min, max) / itemHeight)
          : 0
      scrollSelect(targetIndex, true)
    }
    if (active) {
      setY(offsetY)

      draggingRef.current = false
      const position = offsetY + veY * dirY * 50;
      const targetIndex =
        min < max
          ? -Math.round(bound(position, min, max) / itemHeight)
          : 0
      scrollSelect(targetIndex, false)
    }
  }, {
    axis: 'y',
    from: () => [0, y]
  })

  return (
    <div ref={wheelRef} className={classNames(`${classPrefix}-column`, {
      [`${classPrefix}-column-mid`]: wheelIndex == 1 && optionLen === 3,
    })}
      {...bind()}
    >
      <Motion style={{ y: spring(y) }}>
        {interpolatingStyle => {
          return (
            <div style={{
              transform: `translateY(${interpolatingStyle.y}px)`,
              top: `calc(50% - ${selectedStyle.height || `26.5px`} / 2)`
            }} className={classNames(`${classPrefix}-column-wheel`, {
              [`${classPrefix}-column-wheel-left`]: wheelIndex == 0 && optionLen === 2,
              [`${classPrefix}-column-wheel-right`]: wheelIndex == 1 && optionLen === 2,
            })}>
              {column.map((item, index) => {
                return (
                  <div
                    key={item.value}
                    className={classNames(`${classPrefix}-column-item`)}
                    style={{
                      color: Math.round(-interpolatingStyle.y / itemHeight) === index ? (selectedStyle.color || '#FE4960') : '',
                      fontWeight: Math.round(-interpolatingStyle.y / itemHeight) === index ? (selectedStyle.fontWeight || '500') : '',
                      fontSize: Math.round(-interpolatingStyle.y / itemHeight) === index ? (selectedStyle.fontSize || '21px') : '',
                      height: Math.round(-interpolatingStyle.y / itemHeight) === index ? (selectedStyle.height || '26.5px') : ''
                    }}
                  >
                    <div className={`${classPrefix}-column-label`}>
                      {renderLabel(item)}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        }}
      </Motion>
    </div>
  )
}, (prev, next) => {
  // 决策是否re-render
  if (prev.index !== next.index) return false
  if (prev.value !== next.value) return false
  if (prev.onSelect !== next.onSelect) return false
  if (!isEqual(prev.column, next.column)) {
    return false
  }
  return true
})
