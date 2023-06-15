import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import Mask from '../mask'
import { IconAriseCloseFill } from '@ali/super-icon'
import { Action, ActionButton } from './action-button'
import { mergeProps } from '../../utils/with-default-props'
import SafeArea from '../safe-area'

const classPrefix = `i-slipbar`

export interface SlipBarProps {
  title?: ReactNode
  content?: ReactNode
  actions?: (Action | Action[])[]
  actionsInArow?: boolean
  onAction?: (action: Action, index: number) => void | Promise<void>
  closeOnAction?: boolean
  onClose?: () => void
  afterClose?: () => void
  maskClosable?: boolean
  visible?: boolean
  hideFooter?: boolean
  hideHeader?: boolean
  bodyStyle?: React.CSSProperties
  bodyClassName?: string
  maskStyle?: React.CSSProperties
  maskClassName?: string
}

const defaultProps = {
  actions: [],
  actionsInArow: true,
  closeOnAction: false,
  maskClosable: false,
}

export const SlipBar: FC<SlipBarProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { visible, afterClose, onClose, maskClosable, hideFooter, hideHeader, maskStyle, maskClassName, actionsInArow } = props;

  return (
    <Mask
      visible={visible}
      destroyOnClose
      disableBodyScroll={true}
      afterClose={afterClose}
      onMaskClick={maskClosable ? onClose : undefined}
      style={maskStyle}
      className={classNames(`${classPrefix}-mask`, maskClassName)}
    >
      <div className={`${classPrefix}-wrap`}>
        <div
          style={props.bodyStyle}
          className={classNames(`${classPrefix}-body`, props.bodyClassName)}
        >
          {!hideHeader && <div className={`${classPrefix}-header`}>
            {!!props.title && (
              <div className={`${classPrefix}-body-title`}>{props.title}</div>
            )}
            <div className={`${classPrefix}-close`} onClick={() => { props.onClose?.() }}><IconAriseCloseFill size={12} color="#858b9c" /></div>
          </div>}
          {!!props.content && (
            <div className={`${classPrefix}-body-content-wrapper`}>
              <div className={`${classPrefix}-body-content`}>
                {props.content}
              </div>
            </div>
          )}
        </div>
        <div className={`${classPrefix}-safe`}>
          {!hideFooter && <div className={actionsInArow ? `${classPrefix}-footer` : `${classPrefix}-footer ${classPrefix}-footer-column`}>
            {props.actions.map((row, index) => {
              const actions = Array.isArray(row) ? row : [row]
              return (
                <div className={`${classPrefix}-action-row`} key={index}>
                  {actions.map((action, actionIdx) => (
                    <ActionButton
                      key={action.key}
                      action={action}
                      onAction={async () => {
                        await props.onAction?.(action, actionIdx)
                        if (props.closeOnAction) {
                          props.onClose?.()
                        }
                      }}
                    />
                  ))}
                </div>
              )
            })}
          </div>}
          <SafeArea position='bottom' />
        </div>
      </div>
    </Mask>
  )
}
