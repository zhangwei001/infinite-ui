import classNames from 'classnames'
import React, { useState, useRef, FC, useEffect } from 'react'
import { useUnmountedRef } from 'ahooks'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import Mask from '../mask'
import { useLockScroll } from '../../utils/use-lock-scroll'
import {
  GetContainer,
  renderToContainer,
} from '../../utils/render-to-container'
import { Motion, spring } from "react-motion"

import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'

const classPrefix = `i-popup`

export type PopupProps = {
  visible?: boolean
  mask?: boolean
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  destroyOnClose?: boolean
  forceRender?: boolean
  getContainer?: GetContainer
  afterShow?: () => void
  afterClose?: () => void
  position?: 'bottom' | 'top' | 'left' | 'right'
  bodyClassName?: string
  bodyStyle?: React.CSSProperties
  maskClassName?: string
  maskStyle?: React.CSSProperties
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  stopPropagation?: PropagationEvent[]
} & NativeProps<'--z-index'>

const defaultProps = {
  position: 'bottom',
  visible: false,
  getContainer: () => document.body,
  mask: true,
  stopPropagation: ['click'],
}

export const Popup: FC<PopupProps> = p => {
  const props = mergeProps(defaultProps, p)

  const bodyCls = classNames(
    `${classPrefix}-body`,
    props.bodyClassName,
    `${classPrefix}-body-position-${props.position}`
  )

  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(props.visible)
  useLockScroll(ref, active)

  const unmountedRef = useUnmountedRef()
  
  const onRest = () => {
    if (unmountedRef.current) return
    setActive(props.visible)
    if (props.visible) {
      props.afterShow?.()
    } else {
      props.afterClose?.()
    }
  }

  useEffect(()=>{
    if(props.visible ) setActive(props.visible)
  },[props.visible])


  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <div
        className={classPrefix}
        onClick={props.onClick}
        style={{ display: active ? 'unset' : 'none' }}
      >
        {props.mask && (
          <Mask
            visible={props.visible}
            destroyOnClose={props.destroyOnClose}
            onMaskClick={props.onMaskClick}
            className={props.maskClassName}
            style={props.maskStyle}
            disableBodyScroll={false}
          />
        )}
        <Motion
          style={{percent: spring(props.visible ? 0 : 100)}}
          onRest={onRest}
        >
          {interpolatingStyle => {
            let transformVal = 'none';
            if (props.position === 'bottom') transformVal = `translate(0, ${interpolatingStyle.percent}%)`
            if (props.position === 'top') transformVal = `translate(0, -${interpolatingStyle.percent}%)`
            if (props.position === 'left') transformVal = `translate(-${interpolatingStyle.percent}%, 0)`
            if (props.position === 'right') transformVal = `translate(${interpolatingStyle.percent}%, 0)`
          
            return (
            <div
            className={bodyCls}
            style={{
              ...props.bodyStyle,
              transform: transformVal,
            }}
            ref={ref}
          >
            {props.children}
          </div>
          )
          }}
        </Motion>
      </div>
    )
  )

  return renderToContainer(props.getContainer, node)
}
