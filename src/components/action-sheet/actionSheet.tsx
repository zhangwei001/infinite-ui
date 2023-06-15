import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import Popup from '../popup'
import { mergeProps } from '../../utils/with-default-props'
import { sheetAction } from './types'
import { NativeProps } from 'infinite-ui/src/utils/native-props'

const classPrefix = `i-actionsheet`

export type ActionSheetProps = {
    visible?: boolean
    actions?: sheetAction[] | Array<any>
    cancelText?: string
    cancelClass?: string
    onSelect?: (action: sheetAction | any, index: number) => void
    renderItem?: (action: sheetAction | any, index: number) => ReactNode
    closeOnAction?: boolean
    maskClosable?: boolean
    onClose?: () => void
    onCancel?: () => void
    afterClose?: () => void
    itemClass?: string
} & NativeProps

const defaultProps = {
    visible: false,
    closeOnAction: true,
    maskClosable: true
}


export const ActionSheet: FC<ActionSheetProps> = p => {
    const props = mergeProps(defaultProps, p)
    const { actions, itemClass, visible, onCancel, onClose, maskClosable, closeOnAction, afterClose } = props

    const handleSelect = (action: sheetAction | any, index: number) => {
        if(action.disabled) {
            return
        }
        props.onSelect?.(action, index)
        if (closeOnAction) {
            onClose?.()
        }
        if (action.callback) {
            action.callback()
        }
    }
    const handleCancel = () => {
        onCancel?.()
        onClose?.()
    }
    const renderFormatItem = (item: sheetAction | any) => {
        return (
            <div className={item.disabled ? `${classPrefix}-disabled` : ''}>
                {item.name && <span>{item.name}</span>}
                {item.desc && <span>{item.desc}</span>}
            </div>
        )
    }
    const renderItem = (item: sheetAction | any, index: number) => {
        if (props.renderItem) {
            return  props.renderItem?.(item, index)
        } else {
           return  renderFormatItem(item)
        }
    }
    return (
        <Popup
            visible={visible}
            destroyOnClose
            afterClose={afterClose}
            onMaskClick={ maskClosable ? onClose : undefined}
            bodyClassName={classNames(classPrefix, props.className)}
            bodyStyle={{
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px'
            }}
        >
            <div>
            {actions?.map((item: sheetAction | any, index:number) => {
                return(
                    <div key={`${item}-${index}`}
                    className={classNames(`${classPrefix}_item`, itemClass, item.className)} 
                    onClick={()=>{handleSelect(item, index)}}
                    >
                        {renderItem(item, index)}
                    </div>
                )
            })}
            {props.cancelText && <div className={classNames(`${classPrefix}-cancel`, props.cancelClass)} onClick={handleCancel}>{props.cancelText}</div>}
            </div>
        </Popup>
    )
}