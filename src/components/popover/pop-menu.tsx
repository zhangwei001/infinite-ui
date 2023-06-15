import React, {
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import Button from '../button'
import { BasePopoverProps, Popover, PopoverRef } from './popover'

const classPrefix = `i-popover`

export type Action = {
  text: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  key?: string
  onClick?: () => void
  [key: string]: any
}

export type PopMenuProps<T> = BasePopoverProps & {
  actions: T[]
  onAction?: (text: T) => void
}

export const PopMenu = forwardRef<PopoverRef, PopMenuProps<Action>>(
  (props: PopMenuProps<Action>, ref) => {
    const innerRef = useRef<PopoverRef>(null)
    useImperativeHandle(ref, () => innerRef.current!, [])

    const onClick = useCallback(
      (e: Action) => {
        const { onAction } = props
        if (onAction) {
          onAction(e)
        }
        innerRef.current?.hide()
      },
      [(props as PopMenuProps<Action>).onAction]
    )

    const overlay = useMemo(() => {
      return (
        <>
          {((props as PopMenuProps<Action>).actions || []).map((ele, index) => (
            <div
              className={classNames(`${classPrefix}-inner-menu`, {
                [`${classPrefix}-inner-menu-with-icon`]: !!ele.icon,
              })}
              key={ele.key ?? index}
            >
              <Button
                disabled={ele.disabled}
                onClick={() => {
                  if (!ele.disabled) {
                    onClick(ele)
                    ele.onClick?.()
                  }
                }}
                fill='none'
                block
                style={{ color: !ele.disabled ? 'var(--i-text_black)' : 'var(--i-text_gray_01)' }}
              >
                {ele.icon && (
                  <div className={`${classPrefix}-inner-menu-icon`}>
                    {ele.icon? ele.icon : ''}
                    {ele.text}
                  </div>
                )}
                
              </Button>
            </div>
          ))}
        </>
      )
    }, [(props as PopMenuProps<Action>).actions, onClick])

    return (
      <Popover
        ref={innerRef}
        {...props}
        overlayClassName={classNames(
          `${classPrefix}-menu`,
          props.overlayClassName
        )}
        content={overlay}
      >
        {props.children}
      </Popover>
    )
  }
) as <T extends Action = Action>(
  props: PopMenuProps<T> & { ref?: Ref<PopoverRef> }
) => ReactElement
