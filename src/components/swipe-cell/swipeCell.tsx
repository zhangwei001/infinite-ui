import React, { forwardRef, useRef, ReactNode, useImperativeHandle, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Motion, spring } from "react-motion"
import { useDrag } from '@use-gesture/react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { useRefState } from '../../utils/use-ref-state'
import { getWidth } from '../../utils/get-width';

import { Action } from './type'

const classPrefix = 'i-swipecell'
export type SwipeCellRef = {
    close: () => void
    show: () => void
}

export type SwipeCellProps = {
    rightActions?: Action[]
    onAction?: (action: Action, e: React.MouseEvent) => void
    closeOnTouchOutside?: boolean
    closeOnAction?: boolean
    children?: ReactNode
} & NativeProps

const defaultProps = {
    rightActions: [],
    closeOnTouchOutside: true,
    closeOnAction: true,
}

export const SwipeCell = forwardRef<SwipeCellRef, SwipeCellProps>((p, ref) => {
    const props = mergeProps(defaultProps, p)
    const { children, rightActions } = props
    const rootRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)


    function calcPosition(target: number) {
        const rightWidth = getWidth(rightRef)
        const arr = [-rightWidth, 0]
        return arr.reduce((pre, cur) => {
            const result = Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur
            return result
        })
    }


    const [x, setX] = useState(0)

    const [dragging, setDragging, draggingRef] = useRefState(false)
    const bind = useDrag(({ last, offset: [offsetX], velocity: [vx], direction: [dx] }) => {
        if (offsetX > 0) return
        setDragging(true)
        if (last) {
            let position = offsetX + vx * dx * 80
            position = Math.min(0, position)
            setX(calcPosition(position))
            window.setTimeout(() => {
                setDragging(false)
            })
        } else {
            if (dx > 0 && offsetX < (getWidth(rightRef) / 2)) {
                setX(0)
                return
            }
            setX(offsetX)
        }
    }, {
        from: () => [x, 0],
        bounds: () => {
            const rightWidth = getWidth(rightRef)
            return {
                left: -rightWidth
            }
        },
        rubberband: true,
        axis: 'x',
        preventScroll: true,
        pointer: { touch: true },
    })
    function close() {
        setX(0)

    }
    useImperativeHandle(ref, () => ({
        show: () => {
            setX(-getWidth(rightRef))
        },
        close,
    }))

    useEffect(() => {
        if (!props.closeOnTouchOutside) return
        function handle(e: Event) {
            if (x === 0) {
                return
            }
            const root = rootRef.current
            if (root && !root.contains(e.target as Node)) {
                close()
            }
        }
        document.addEventListener('touchstart', handle)
        return () => {
            document.removeEventListener('touchstart', handle)
        }
    }, [props.closeOnTouchOutside])

    return withNativeProps(
        props,
        <div
            ref={rootRef}
            {...bind()}
            className={classNames(classPrefix, props.className)}
            onClickCapture={e => {
                if (draggingRef.current) {
                    e.stopPropagation()
                    e.preventDefault()
                }
            }}
        >
            <Motion style={{ x: spring(x) }}>
                {interpolatingStyle => {
                    return (<div
                        className={`${classPrefix}-wrapper`}
                        style={{ transform: `translateX(${interpolatingStyle.x}px)` }}
                    >
                        {children}
                        <div
                            ref={rightRef}
                            className={`${classPrefix}-actions ${classPrefix}-actions-right`}>
                            {rightActions.map(item => (
                                <div
                                    key={item.key}
                                    className={`${classPrefix}-action`}
                                    style={item.bgColor ? { backgroundColor: item.bgColor } : {}}
                                    onClick={(e) => {
                                        if (props.closeOnAction) {
                                            close()
                                        }
                                        item.onClick?.(e)
                                        props.onAction?.(item, e)
                                    }}>
                                    {item.icon ? item.icon : null}
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>)
                }}
            </Motion>
        </div>
    )
})
