import { show } from './show'
import { DialogProps } from './index'
import { ReactNode } from 'react'
import { mergeProps } from '../../utils/with-default-props'

export type DialogConfirmProps = Omit<
  DialogProps,
  'visible' | 'closeOnAction' | 'actions'
> & {
  confirmText?: ReactNode
  cancelText?: ReactNode
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

const defaultProps = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
}

export function confirm(p: DialogConfirmProps) {
  const props = mergeProps(defaultProps, p)
  return new Promise<boolean>(resolve => {
    show({
      ...props,
      closeOnAction: true,
      onClose: () => {
        props.onClose?.()
        resolve(false)
      },
      actions: [
        [
          {
            key: 'cancel',
            type: 'secondary',
            text: props.cancelText,
            onClick: () => {
              props.onCancel?.()
              resolve(false)
            },
          },
          {
            key: 'confirm',
            text: props.confirmText,
            onClick: () => {
              props.onConfirm?.()
              resolve(true)
            },
          },
        ],
      ],
    })
  })
}
