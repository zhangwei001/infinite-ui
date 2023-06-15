import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { IconArrow } from '@ali/super-icon'

import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `i-button`
export type ButtonProps = {
  color?: 'primary' | 'secondary' | 'tertiary' | 'dimmed'
  type?: 'primary' | 'secondary' | 'tertiary' | 'dimmed' | 'special'
  icon?: ReactNode
  size?: 'smaller' | 'small' | 'middle' | 'large'
  block?: boolean
  link?: boolean
  hideArrow?: boolean
  fill?: 'solid' | 'outline' | 'none'
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  style?: React.CSSProperties
  btnType?: 'submit' | 'reset' | 'button'
} & NativeProps<
  | '--i-color-text'
  | '--i-brand_pink'
  | '--i-border-color'
  | '--color'
  | '--i-text_white'
  | '--i-text_gray_01'
  | '--i-text_gray_02'
  | '--i-text_gray_03'
  | '--i-bg_gray_01'
  | '--i-brand_blue'
  | '--i-brand_pink'
>

const defaultProps = {
  color: 'primary',
  type: 'primary',
  fill: 'solid',
  size: 'middle',
  block: false,
  btnType: 'button'
}

export const Button: FC<ButtonProps> = p => {
  const props = mergeProps(defaultProps, p)
  const disabled = props.disabled
  const formatType = (p && p.type) || props.color
  return withNativeProps(props,
    <button
      type={props.btnType}
      onClick={props.onClick}
      className={classNames(
        'border-1px',
        classPrefix,
        formatType,
        formatType ? `${classPrefix}-${formatType}` : null,
        {
          [`${classPrefix}-disabled`]: disabled,
          [`${classPrefix}-fill-outline`]: props.fill === 'outline',
          [`${classPrefix}-fill-none`]: props.fill === 'none',
          [`${classPrefix}-small`]: props.size === 'small',
          [`${classPrefix}-smaller`]: props.size === 'smaller',
          [`${classPrefix}-large`]: props.size === 'large',
          [`${classPrefix}-block`]: props.block
        },
        props.icon ? `${classPrefix}-icon-${props.size}` : null,
        props.link ? `${classPrefix}-link-${formatType}` : null,
        props.className
      )}
      style={props.style}
      disabled={disabled}
    >
      {props.icon && (
        <div className={`${classPrefix}-icon`}>{props.icon}</div>
      )}
      <div className={`${classPrefix}-content`}>{props.children}</div>
      {props.link && !props.hideArrow && (
        <div className={`${classPrefix}-arrow`}>
          <IconArrow size={12} color='currentColor'  />
        </div>
      )}
    </button>
  )
}