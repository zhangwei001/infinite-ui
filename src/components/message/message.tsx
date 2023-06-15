import React, { FC, useMemo, useState } from 'react'
import classNames from 'classnames'
import { IconNotice, IconError, IconSuccess, IconWarn, IconAriseCloseFill, IconArrow } from '@ali/super-icon'
import { mergeProps } from '../../utils/with-default-props'


const classPrefix = 'i-message'

export type MessageProps = {
    color?: 'default' | 'warning' | 'error' | 'success' | 'promo'
    icon?: React.ReactNode
    hideIcon?: boolean
    content?: React.ReactNode
    title?: React.ReactNode
    closeable?: boolean
    onClose?: () => void
    extra?: React.ReactNode
    style?: React.CSSProperties
    type?: 'primary' | 'secondary',
    isInline?: boolean,
}

const defaultProps = {
    color: 'default',
    type: 'primary',
    isInline: false,
}

export const Message: FC<MessageProps> = p => {
    const props = mergeProps(defaultProps, p)
    const { color, type, icon, hideIcon, content, title, closeable, onClose, extra, isInline } = props
    const [visible, setVisible] = useState(true)
    let contentClass = `${classPrefix}-wrap-default`;
   
    const renderColor = useMemo(()=>{
        switch (color) {
            case 'default':
                return '#1A71FF'
            case 'warning':
                return '#FF7F00'
            case 'error':
                return '#E61414'
            case 'success': 
                return '#2CB360'
            default:
                return '#1A71FF'
        }
    }, [color])

    const iconElement = () => {
        switch (color) {
            case 'default':
                return <IconNotice size={15} color={renderColor} />
            case 'warning':
                contentClass = `${classPrefix}-wrap-warning`
                return <IconWarn size={15} color={renderColor}  />
            case 'error':
                contentClass = `${classPrefix}-wrap-error`
                return <IconError size={15} color={renderColor} />
            case 'success': 
                contentClass = `${classPrefix}-wrap-success`
                return <IconSuccess size={15} color={renderColor} />
            default:
                return null
        }
    }
    if (!visible) return null

    return (
        <div className={classNames(
            classPrefix,
            {
                [`${classPrefix}-inline`]: isInline,
                [`${classPrefix}-closeable`]: closeable,
                [`${classPrefix}-${type}-${color}`]: color && type
            }
        )} style={props.style}>
            {!hideIcon && (
                icon ? (
                    <div className={`${classPrefix}-icon`}>{icon}</div>
                ) : (
                    <div className={`${classPrefix}-icon`}>{iconElement()}</div>
                )
            )}
            <div className={classNames(`${classPrefix}-wrap`)}>
                {title && <h5 className={classNames(`${classPrefix}-title`, contentClass)}>{title}</h5>}
                {content && <p className={classNames(`${classPrefix}-content`, contentClass)}>{content}</p>}
                {extra && <div className={classNames(`${classPrefix}-extra`, contentClass)}>{extra}
                    <div className={`${classPrefix}-arrow`}>
                        <IconArrow size={12} color={renderColor} />
                    </div>
                </div>
                }
            </div>
            {closeable && (
                <div className={classNames(`${classPrefix}-close`)} onClick={() => {
                    setVisible(false)
                    onClose?.()
                }}><IconAriseCloseFill size={12} color={renderColor} /></div>
            )}
        </div>
    )
}