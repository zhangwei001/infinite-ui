import React, { FC } from 'react'
import Button from '../button'
import { NativeProps, withNativeProps } from '../../utils/native-props'

export type Action = {
  key: string | number
  text: string
  disabled?: boolean
  type?: 'primary' | 'secondary' | 'tertiary' | 'dimmed'
  color?: 'primary' | 'secondary' | 'tertiary' | 'dimmed'
  onClick?: () => void | Promise<void>
} & NativeProps

export const DialogActionButton: FC<{
  action: Action
  onAction: () => void | Promise<void>
}> = props => {
  const { action } = props
  const formartType = action.type || action.color;
  return withNativeProps(
    props.action,
    <Button
      key={action.key}
      type={formartType}
      onClick={() => {
        action.onClick?.()
        props.onAction?.()
      }}
      block
      disabled={action.disabled}
    >
      {action.text}
    </Button>
  )
}
