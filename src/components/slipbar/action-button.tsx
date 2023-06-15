import React, { FC, useState } from 'react'
import Button from '../button'

export type Action = {
  key: string | number
  text: string
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'tertiary' | 'dimmed'
  onClick?: () => void | Promise<void>
}

export const ActionButton: FC<{
  action: Action
  onAction: () => void | Promise<void>
}> = props => {
  const { action } = props

  const [loading, setLoading] = useState(false)

  return (
    <Button
      key={action.key}
      color={action.color}
      onClick={async () => {
        setLoading(true)
        try {
          await action.onClick?.()
          await props.onAction?.()
        } catch (e) {
          setLoading(false)
          throw e
        }
        setLoading(false)
      }}
      block
      disabled={action.disabled}
    >
      {action.text}
    </Button>
  )
}
