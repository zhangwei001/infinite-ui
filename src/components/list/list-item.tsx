import React, { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import classNames from 'classnames'
import Exposure from '../exposure'
import { IconArrow } from '@ali/super-icon'

import { toCSSLength } from '../../utils/to-css-length'

const classPrefix = `i-list-item`

export type ListItemProps = {
  title?: ReactNode
  children?: ReactNode
  description?: ReactNode
  prefix?: ReactNode
  extra?: ReactNode
  padding?: number | string
  clickable?: boolean
  arrow?: boolean | ReactNode
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
  onAppear?: (e: React.MouseEvent) => void
  onDisappear?: (e: React.MouseEvent) => void
  onFirstAppear?: (e: React.MouseEvent) => void
} & NativeProps<
  '--prefix-width' | '--item-padding' | '--align-items'
>

export const ListItem: FC<ListItemProps> = props => {
  const clickable = props.clickable ?? !!props.onClick
  const arrow = props.arrow === undefined ? clickable : props.arrow
  const style: ListItemProps['style'] = {}
  if (typeof(props.padding) !== 'undefined') {
    style['--item-padding'] = toCSSLength(props.padding)
  }

  const exposureEvent = (e:any) => {
    if (props.onAppear) {
      props.onAppear(e);
    }
  }

  const firstExposure = (e:any) => {
    if (props.onFirstAppear) {
      props.onFirstAppear(e);
    }
  }

  const hideEvent = (e:any) => {
    if (props.onDisappear) {
      props.onDisappear(e);
    }
  }

  const content = (
    <Exposure always={true} onAppear={exposureEvent} onFirstAppear={firstExposure} onDisappear={hideEvent} >
      <div className={`${classPrefix}-content`} style={style}>
        <div className={`${classPrefix}-content-main`}>
          {props.title && (
            <div className={`${classPrefix}-title`}>{props.title}</div>
          )}
          {props.children}
          {props.description && (
            <div className={`${classPrefix}-description`}>
              {props.description}
            </div>
          )}
        </div>
        {arrow && (
          <div className={`${classPrefix}-arrow`}><IconArrow size={16} color='currentColor' /></div>
        )}
      </div>
    </Exposure>
  )

  return withNativeProps(
    props,
    React.createElement(
      clickable ? 'a' : 'div',
      {
        className: classNames(
          `${classPrefix}`,
          clickable ? ['i-plain-anchor'] : [],
          props.disabled && `${classPrefix}-disabled`
        ),
        onClick: props.disabled ? undefined : props.onClick,
      },
      content
    )
  )
}
