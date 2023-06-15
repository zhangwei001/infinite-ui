import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { IconMinus, IconPlus } from '@ali/super-icon'
import { NativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { usePropsValue } from '../../utils/use-props-value'
import { callInterceptor } from '../../utils/call-interceptor'

const classPrefix = 'i-stepper';

export type StepperProps = {
    value?: number | undefined
    defaultValue?: number | undefined
    min?: number
    max?: number
    step?: number
    editable?: boolean
    disabled?: boolean
    onChange?: (value: number|undefined) => void
    beforeChange?: (value: number|undefined) => boolean
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
} & NativeProps

const defaultProps = {
    defaultValue: 0,
    step: 1,
    editable: true,
    disabled: false,
}


export const Stepper: FC<StepperProps> = p => {
    const props = mergeProps(defaultProps, p);
    const { disabled, step, max, min, editable } = props

    const [value, setValue] = usePropsValue({
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange
    })

    const isMin = value !==undefined && min !== undefined && value <= min;
    const isMax = value !==undefined && max !== undefined && value >= max;
    const [disableMinus, setDisableMinus] = useState(isMin)
    const [disablePlus, setDisablePlus] = useState(isMax)

    const setFormatValue = (result: number | undefined) => {
        let innerDefaultValue = result;
        if (result !== undefined) {
            if (min !== undefined && result < min) {
                innerDefaultValue = min
            }
            if (max !==undefined && result > max) {
                innerDefaultValue = max
            }
        }
        if (props.beforeChange) {
            callInterceptor(props.beforeChange, {
              args: [innerDefaultValue],
              done() {
                setValue(innerDefaultValue)
              },
            });
          } else {
            setValue(innerDefaultValue)
          }
    }
    const onMinus = () => {
        if (disabled) return true
        if (value === null || value === undefined) return false
        if (min !== undefined) {
            if(value > min) {
                const result = value - step;
                setFormatValue(result)
                if (disablePlus) {
                    setDisablePlus(false)
                }
                if (result <= min) {
                    setDisableMinus(true)
                }
            }
        } else {
            const result = value - step;
            setFormatValue(result)
        }        
    }
    const onPlus = () => {
        if (disabled) return
        if (value === null || value === undefined) return
        if (max !== undefined) {
          if(value < max) {
            const result = value + step;
            setFormatValue(result)
            if (disableMinus) {
                setDisableMinus(false)
            }
            if (result >= max) {
                setDisablePlus(true)
            }
          }
        } else {
            const result = value + step;
            setFormatValue(result)
        }
    }
    const changeHandler = (e: any) => {
        const val = e.target.value
        if (val && min !== undefined) {
            if (val < min) {
                return
            }
        }
        if (val && max !== undefined) {
            if(val > max) {
                return
            }
        }
        setFormatValue(parseInt(val))
    }
    return (
        <div className={classNames(classPrefix, props.className, {
            [`${classPrefix}-disabled`]: disabled
        })}>
            <div className={classNames(`${classPrefix}-minus`, {
                [`${classPrefix}-btn-disabled`]: disableMinus
            })} onClick={onMinus}>
                <IconMinus size={10} color={disableMinus? 'var(--i-stepper-button-disabled-icon-color)' : 'var(--i-stepper-button-text-color)'} />
            </div>
            <div className={classNames(`${classPrefix}-wrap`)} >
                <input 
                    className={classNames(`${classPrefix}-input`)} 
                    type="number"
                    value={value}
                    disabled={disabled}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    onChange={changeHandler}
                    readOnly={!editable}
                />
            </div>
            <div className={classNames(`${classPrefix}-plus`,  {
                [`${classPrefix}-btn-disabled`]: disablePlus
            })} onClick={onPlus}>
                <IconPlus size={10} color={disablePlus? 'var(--i-stepper-button-disabled-icon-color)' : 'var(--i-stepper-button-text-color)'} />
            </div>
        </div>
    )
}