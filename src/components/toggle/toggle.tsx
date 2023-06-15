import React, { FC } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import classNames from 'classnames'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'
import { NativeInput } from '../checkbox/native-input'

const classPrefix = `i-toggle`

export type ToggleValue = string | number

export type ToggleProps = {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  id?: string
  icon?: (checked: boolean) => React.ReactNode
  text: string
} & NativeProps<'--icon-size' | '--font-size' | '--select-font-color' | '--select-bg-color'>

const defaultProps = {
  defaultChecked: false,
  indeterminate: false,
  box: false,
}

export const Toggle: FC<ToggleProps> = p => {
  const props = mergeProps(defaultProps, p)

  const [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  }) as [boolean, (v: boolean) => void]

  const renderIcon = () => {
    if (props.icon) {
      return (
        <div className={`${classPrefix}-icon`}>
          {props.icon(checked)}
        </div>
      )
    }

    return null
  }

  return withNativeProps(
    props,
    <label
      className={classNames(classPrefix, {
        [`${classPrefix}-checked`]: checked,
      })}
    >
      <NativeInput
        type='checkbox'
        checked={checked}
        onChange={setChecked}
        id={props.id}
      />
      <div
        className={classNames({
          [`${classPrefix}-content`]: true,
          [`${classPrefix}-content--checked`]: checked,
        })}
      >
        {props.icon && renderIcon()}
        <div className={`${classPrefix}-text`}>
          {props.text}
        </div>
      </div>
    </label>
  )
}
