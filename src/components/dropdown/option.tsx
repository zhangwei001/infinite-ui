import classNames from 'classnames'
import React, { FC } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { useShouldRender } from '../../utils/should-render'


import './dropdown.less'
const classPrefix = `i-dropdown-option`

export type DropdownItemProps = {
  label?: string
  value: string
  active?: boolean
  forceRender?: boolean
  destroyOnClose?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onMouseDown? : (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: React.ReactNode
} & NativeProps

const Option: FC<DropdownItemProps> = props => {
  const cls = classNames(classPrefix, {
    className: true
  })

  return withNativeProps(
    props,
    <div className={cls}  onMouseDown={props.onMouseDown}>
      {props.children}
    </div>

  )
}

export default Option

type DropdownItemChildrenWrapProps = {
  onClick?: () => void
} & Pick<
  DropdownItemProps,
  'active' | 'forceRender' | 'destroyOnClose' | 'children'
>
export const ItemChildrenWrap: FC<DropdownItemChildrenWrapProps> = props => {
  const { active = false } = props
  const shouldRender = useShouldRender(
    active,
    props.forceRender,
    props.destroyOnClose
  )
  const cls = classNames(`${classPrefix}-content`, {
    [`${classPrefix}-content-hidden`]: !active,
  })

  return shouldRender ? (
    <div className={cls} onClick={props.onClick}>
      {props.children}
    </div>
  ) : null
}