import React, { FC } from 'react'
import classNames from 'classnames'
import { NativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `i-switch`

export type SwitchProps = {
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (val: boolean) => void
    activeColor?: string
    inActiveColor?: string
} & NativeProps<'--i-switch-width' | '--i-switch-height'>

const defaultProps = {
    defaultChecked: false,
    disabled: false
}

export const Switch: FC<SwitchProps> = p => {
    const props = mergeProps(defaultProps, p)
    const { disabled, activeColor, inActiveColor } = props
    const [checked, setChecked] = usePropsValue({
        value: props.checked,
        defaultValue: props.defaultChecked,
        onChange: props.onChange
    });
    const handleChange = () => {
        if (disabled) {
            return
        }
        const nextChecked = !checked
        setChecked(nextChecked)
    }
    let checkedStyle = {};
    if (activeColor || inActiveColor) {
        checkedStyle = checked ? { backgroundColor: activeColor, borderColor: activeColor } : { backgroundColor: inActiveColor };
    }
    return (
        <div className={classNames(classPrefix, {
            [`${classPrefix}-disabled`]: disabled,
            [`${classPrefix}-active`]: checked,
        }, props.className,)} style={checkedStyle}  onClick={handleChange}>
            <span className={classNames(`${classPrefix}-handler`)}></span>
        </div>
    )
}
