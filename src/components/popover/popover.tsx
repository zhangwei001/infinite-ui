import React, { forwardRef, useImperativeHandle, ReactElement } from 'react'
import Tooltip from 'rc-tooltip'
import classNames from 'classnames'
import type { TooltipProps } from 'rc-tooltip/lib/Tooltip'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps } from '../../utils/native-props'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'

const classPrefix = `i-popover`
const enterClassName = 'entering'
const leaveClassName = 'leaving'

export type BasePopoverProps = {
  getContainer?: () => HTMLElement
  destroyOnHide?: boolean
  children: ReactElement
  mode?: 'light' | 'dark'
  trigger?: 'click'
  placement:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
  stopPropagation?: PropagationEvent[]
} & Pick<
  TooltipProps,
  | 'defaultVisible'
  | 'visible'
  | 'onVisibleChange'
  | 'overlayStyle'
  | 'overlayClassName'
  | 'align'
  | 'zIndex'
> &
  NativeProps<'--z-index'>

type PopoverProps = BasePopoverProps & { content: React.ReactNode }

export type PopoverRef = {
  show: () => void
  hide: () => void
  visible: boolean
}

const defaultProps = {
  defaultVisible: false,
  stopPropagation: ['click'],
}

export const Popover = forwardRef<PopoverRef, PopoverProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const { mode = 'light' } = props

  const [visible, setVisible] = usePropsValue({
    value: props.visible,
    defaultValue: props.defaultVisible,
    onChange: props.onVisibleChange,
  })

  useImperativeHandle(
    ref,
    () => {
      return {
        show: () => setVisible(true),
        hide: () => setVisible(false),
        visible,
      }
    },
    [visible]
  )

  const overlay = withStopPropagation(
    props.stopPropagation,
    <div className={`${classPrefix}-inner-content`}>
      {(props as PopoverProps).content}
    </div>
  )

  return (
    <Tooltip
      {...props}
      overlayClassName={classNames(
        `${classPrefix}-${mode}`,
        props.overlayClassName
      )}
      destroyTooltipOnHide={props.destroyOnHide}
      prefixCls={classPrefix}
      getTooltipContainer={props.getContainer || (() => document.body)}
      visible={visible}
      arrowContent={<span className={`${classPrefix}-arrow-content`} />}
      onVisibleChange={setVisible}
      trigger={props.trigger ?? []}
      motion={{
        motionName: {
          appear: enterClassName,
          appearActive: enterClassName,
          enter: enterClassName,
          enterActive: enterClassName,
          leaveActive: leaveClassName,
          leave: leaveClassName,
        },
        motionDeadline: 200,
      }}
      overlay={overlay}
    >
      {props.children}
    </Tooltip>
  )
})
