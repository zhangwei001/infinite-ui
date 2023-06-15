import React, { FC, ReactNode, useState } from 'react'
import classNames from 'classnames'
import { Motion, spring } from 'react-motion';
import { useIsomorphicLayoutEffect, useUnmountedRef } from 'ahooks'
import { IconCloseBorder } from '@ali/super-icon'

import Mask from '../mask'
import { Action, DialogActionButton } from './dialog-action-button'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `i-dialog`

export interface DialogProps {
  title?: ReactNode
  desc?: ReactNode
  content?: ReactNode
  actions?: (Action | Action[])[]
  onAction?: (action: Action, index: number) => void | Promise<void>
  closeOnAction?: boolean
  onClose?: () => void
  afterClose?: () => void
  maskClosable?: boolean
  visible?: boolean
  hideFooter?: boolean
  hideCloseBtn?: boolean
  bodyStyle?: React.CSSProperties
  bodyClassName?: string
  maskStyle?: React.CSSProperties
  maskClassName?: string
}

const defaultProps = {
  actions: [],
  closeOnAction: false,
  maskClosable: false,
}

export const Dialog: FC<DialogProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { visible, afterClose, onClose, maskClosable, hideFooter, hideCloseBtn, maskStyle, maskClassName } = props;
  const [active, setActive] = useState(props.visible)

  const unmountedRef = useUnmountedRef()

  const onRest = () => {
    if (unmountedRef.current) return
    setActive(props.visible)
    if (!props.visible)  {
      props.afterClose?.()
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (props.visible) {
      setActive(true)
    }
  }, [props.visible])

  return (
    <Motion style={{
      scale: spring(props.visible ? 1 : 0.8, {
        stiffness: 300,
        damping: 26, //反弹抖动
        precision: 0.01
      }),
      opacity: spring(props.visible ? 1 : 0,{
        stiffness: 300,
        damping: 26, //反弹抖动
        precision: 0.01
      })

    }} 
    
    onRest={onRest}
    >
    {interpolatingStyle =><Mask
    visible={visible}
      destroyOnClose
      disableBodyScroll={true}
      afterClose={afterClose}
      onMaskClick={maskClosable ? onClose : undefined}
      style={maskStyle}
      className={classNames(`${classPrefix}-mask`, maskClassName)}
    >
      <div className={`${classPrefix}-container`}>
        
           <div className={`${classPrefix}-animate-wrap`} style={{ 
            transform: `scale(${interpolatingStyle.scale})` ,
            opacity: interpolatingStyle.opacity
            }}>


            <div onClick={e => e.stopPropagation()} className={`${classPrefix}-wrap`}>
              <div
                style={props.bodyStyle}
                className={classNames(`${classPrefix}-body`, props.bodyClassName)}
              >
                {!!props.title && (
                  <div className={`${classPrefix}-body-title`}>{props.title}</div>
                )}
                {!!props.desc && (
                  <div className={`${classPrefix}-body-desc`}>
                    {props.desc}
                  </div>
                )}
                {!!props.content && (
                  <div className={`${classPrefix}-body-content-wrapper`}>
                    <div className={`${classPrefix}-body-content`}>
                      {props.content}
                    </div>
                  </div>
                )}
              </div>
              {!hideFooter && <div className={`${classPrefix}-footer`}>
                {props.actions.map((row, index) => {
                  const actions = Array.isArray(row) ? row : [row]
                  return (
                    <div className={`${classPrefix}-action-row`} key={index}>
                      {actions.map((action, actionIdx) => (
                        <DialogActionButton
                          key={action.key}
                          action={action}
                          onAction={() => {
                            props.onAction?.(action, actionIdx)
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
            </div>
            {!hideCloseBtn && <div onClick={() => { props.onClose?.() }} className={`${classPrefix}-close`}>
              {<IconCloseBorder size={30} color='#ffffff' />}
            </div>}
          </div>
      </div>
    </Mask>}
        </Motion>
  )
}
