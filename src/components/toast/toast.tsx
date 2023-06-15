import React, { FC, useRef } from 'react'
import classNames from 'classnames'
import Mask from '../mask'
import { IconNotice, IconError, IconSuccess, IconWarn } from '@ali/super-icon'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = 'i-toast'

export type ToastProps = {
    icon?: 'success' | 'warning' | 'info' | 'error'
    customIcon?: React.ReactNode
    content?: React.ReactNode
    duration?: number
    maskStyle?: React.CSSProperties
    maskClassName?: string
    maskClickable?: boolean
    visible?: boolean
    buttonText?: string
    clickEvent?: () => void
}

const defaultProps = {
    maskClickable: true
}
export const Toast: FC<ToastProps> = p => {
    const props = mergeProps(defaultProps, p)
    const { icon, customIcon, content, maskStyle, maskClassName, maskClickable, visible, buttonText,  clickEvent} = props
    const ref = useRef<HTMLDivElement>(null)

    const iconElement = () => {
        if (customIcon) return customIcon
        if (icon === null || icon === undefined) return null
        switch(icon) {
            case 'info':
                return <IconNotice size={30} color='#1A71FF' />
            case 'warning':
                return <IconWarn size={30} color='#FF7F00'  />
            case 'error':
                return <IconError size={30} color='#E61414'  />
            case 'success': 
                return <IconSuccess size={30} color='#2CB360'  />
            default:
                return null
        }
    }
    return (
        <Mask
            visible={visible}
            destroyOnClose
            opacity={0}
            disableBodyScroll={!maskClickable}
            style={{
                pointerEvents: maskClickable ? 'none' : 'all',
                ...maskStyle,
            }}
            className={classNames(`${classPrefix}-mask`, maskClassName)}
        >
            <div className={classNames(`${classPrefix}-container`, buttonText ? `${classPrefix}-container-center` : '')}>
                {iconElement() && (
                    <div className={classNames(`${classPrefix}-icon`)}>{iconElement()}</div>
                )}
                <p className={classNames(`${classPrefix}-wrap`)}  ref={ref} >
                    {content}
                </p>
                {buttonText && <div className={classNames(`${classPrefix}-btn`)} onClick={() => {
                    props.clickEvent && props.clickEvent()
                 }}>
                    <span className={classNames(`${classPrefix}-btn-text`)}>{buttonText}</span>
                </div>}
            </div>
        </Mask>
    )
}