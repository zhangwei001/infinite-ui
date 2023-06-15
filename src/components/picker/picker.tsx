import React, { useState, useEffect, useCallback, forwardRef, ReactNode } from "react";
import classNames from 'classnames'
import dayjs from 'dayjs';
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/th';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/vi';
import 'dayjs/locale/ms';
import Popup, { PopupProps } from '../popup';
import Button from '../button';
import { IconAriseCloseFill } from '@ali/super-icon'

import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { Wheel } from "./wheel";
import { PickerColumn, PickerColumnItem, PickerValue, PickerType } from "./types";
import { formatData } from './utils';
import './picker.less'


export type PickerRef = {
    close: () => void
}

export type PickerProps = {
    type?: PickerType
    minDate?: Date
    maxDate?: Date
    visible?: boolean
    title?: ReactNode
    confirmText?: ReactNode
    cancelText?: ReactNode
    onCancel?: () => void
    onConfirm?: (v?: any) => void
    onSelect?: (v?: any) => void
    onClose?: () => void
    options?: PickerColumn[]
    defaultValue?: PickerValue[]
    value?: PickerValue[],
    columnsOrder?: Array<string>,
    buttonPosition?: 'top' | 'bottom',
    selectedStyle?: React.CSSProperties,
    popupProps?: PopupProps,
    lang?: 'th' | 'id' | 'en' | 'zh' | 'vi' | 'ms',
    monthWithNumber?: boolean,
    showScrollStyle?: boolean,
    showSelectedBorder?: boolean,
} & NativeProps<
    | '--i-picker-height'
    | '--item-font-size'
>

const defaultProps = {
    visible: false,
    cancelText: 'Cancel',
    confirmText: 'Done',
    buttonPosition: 'bottom',
    popupProps: {
        bodyStyle: {
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
        }
    },
    lang: 'en',
    showScrollStyle: true,
    showSelectedBorder: true
}

const classPrefix = 'i-picker';

//@ts-ignore
dayjs.extend(localeData);
export const Picker = forwardRef<PickerRef, PickerProps>((p: PickerProps, ref) => {
    const props = mergeProps(defaultProps, p);
    const { minDate, maxDate } = props;

    const [innerValue, setInnerValue] = useState(
        props.value === undefined ? props.defaultValue : props.value
    )
    const [value, setValue] = useState(props.value)

    const [options, setOptions] = useState(props.options || [])

    useEffect(() => {
        const currentLang = props.lang === 'zh' ? 'zh-cn' : props.lang;
        dayjs.locale(currentLang);
    }, []);

    useEffect(() => {
        props.onSelect?.(innerValue)
        if (props.type && minDate && maxDate) {
            let monthOptionArr = dayjs.months()
            if (props.monthWithNumber) {
                monthOptionArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            }
            const formatOptions = formatData(props.type, minDate, maxDate, innerValue, props.columnsOrder, monthOptionArr);
            setOptions(formatOptions)
        }
    }, [innerValue])

    useEffect(() => {
        if (props.value === undefined) return
        if (props.value === innerValue) return
        setInnerValue(props.value)
    }, [props.value])

    const handleSelect = useCallback((val: PickerValue, index: number) => {
        setInnerValue((prev: PickerValue[]) => {
            const next = [...prev]
            next[index] = val
            return next
        })
    }, [])

    const onCancel = () => {
        props.onCancel?.()
        props.onClose?.()
    }
    const onConfirm = () => {
        setValue(innerValue)
        props.onConfirm?.(innerValue)
        props.onClose?.()
    }


    const renderLabel = (item: PickerColumnItem) => {
        return (
            <div>{item.label}</div>
        )
    }
    const optionsLen = Math.round(options.length / 2);
    return withNativeProps(
        props,
        <Popup visible={props.visible} {...props.popupProps}>
            <div className={classNames(classPrefix, props.className)} style={props.style}>
                <div className={`${classPrefix}-header`}>
                    {props.buttonPosition === 'top' && <a className={`${classPrefix}-header-button ${classPrefix}-header-button-cancel`} onClick={onCancel}>{props.cancelText}</a>}
                    {props.title && <span className={`${classPrefix}-header-title`}>{props.title}</span>}
                    {props.buttonPosition === 'top' && <a className={`${classPrefix}-header-button ${classPrefix}-header-button-done`} onClick={onConfirm}>{props.confirmText}</a>}
                    {props.buttonPosition === 'bottom' && <div onClick={onCancel} className={`${classPrefix}-header-close`}><IconAriseCloseFill size={12} color="#858b9c" /></div>}
                </div>
                <div className={`${classPrefix}-content`}>
                    {options && options.map((column: PickerColumnItem[], index: number) => (
                        <Wheel
                            key={index}
                            index={index}
                            selectedStyle={props.selectedStyle}
                            position={optionsLen < index + 1 ? 'left' : (optionsLen > index + 1 ? 'right' : 'center')}
                            column={column}
                            value={innerValue ? innerValue[index] : ''}
                            onSelect={handleSelect}
                            renderLabel={(item) => renderLabel(item)}
                            optionLen={props.showScrollStyle ? options.length : 1}
                            wheelIndex={props.showScrollStyle ? index : 1}

                        />
                    ))}
                    <div className={`${classPrefix}-mask`}>
                        <div className={`${classPrefix}-mask-top`} />
                        <div className={classNames(`${classPrefix}-mask-middle`, {
                            [`${classPrefix}-mask-middle-border`]: props.showSelectedBorder
                        })} />
                        <div className={`${classPrefix}-mask-bottom`} />
                    </div>
                </div>
            </div>
            {
                props.buttonPosition === 'bottom' && (
                    <div className={`${classPrefix}-bottom`}>
                        <Button onClick={onCancel} block type='secondary'>{props.cancelText}</Button>
                        <Button onClick={onConfirm} block>{props.confirmText}</Button>
                    </div>
                )
            }
        </Popup>
    )
})
