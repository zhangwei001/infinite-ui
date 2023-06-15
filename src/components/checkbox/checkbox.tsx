import React, { FC, useContext } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import classNames from 'classnames'
import { CheckboxGroupContext } from './group-context'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'
import { devWarning } from '../../utils/dev-log'
import { CheckIcon } from './check-icon'
// import { IndeterminateIcon, IndeterminateBoxIcon } from './indeterminate-icon'
import { isDev } from '../../utils/is-dev'
import { NativeInput } from './native-input'

const classPrefix = `i-checkbox`

export type CheckboxValue = string | number

export type CheckboxProps = {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  value?: CheckboxValue
  block?: boolean
  id?: string
  icon?: (checked: boolean) => React.ReactNode
  // indeterminate?: boolean
  // box?: boolean
  // icon?: (checked: boolean, indeterminate: boolean) => React.ReactNode
} & NativeProps<'--icon-size' | '--font-size' | '--gap' | '--base-color'>

const defaultProps = {
  defaultChecked: false,
  // indeterminate: false,
  // box: false,
}

export const Checkbox: FC<CheckboxProps> = p => {
  const groupContext = useContext(CheckboxGroupContext)

  const props = mergeProps(defaultProps, p)

  let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  }) as [boolean, (v: boolean) => void]
  let disabled = props.disabled

  const { value } = props
  if (groupContext && value !== undefined) {
    if (isDev) {
      if (p.checked !== undefined) {
        devWarning(
          'Checkbox',
          'When used within `Checkbox.Group`, the `checked` prop of `Checkbox` will not work.'
        )
      }
      if (p.defaultChecked !== undefined) {
        devWarning(
          'Checkbox',
          'When used within `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work.'
        )
      }
    }

    checked = groupContext.value.includes(value)
    setChecked = (nextChecked: boolean) => {
      if (nextChecked) {
        groupContext.check(value)
      } else {
        groupContext.uncheck(value)
      }
      props.onChange?.(nextChecked)
    }
    disabled = disabled || groupContext.disabled
  }

  const renderIcon = () => {
    if (props.icon) {
      return (
        <div className={`${classPrefix}-custom-icon`}>
          {/* {props.icon(checked, props.indeterminate)} */}
          {props.icon(checked)}
        </div>
      )
    }

    return (
      <div className={classNames({
        [`${classPrefix}-icon`]: true,
        // [`${classPrefix}-icon--box`]: props.box
      })}>
        {/* {props.indeterminate ? (props.box ? (checked && <IndeterminateBoxIcon /> ) : (checked && <IndeterminateIcon />) ) : checked && <CheckIcon />} */}
        {checked && <CheckIcon />}
      </div>
    )
  }

  return withNativeProps(
    props,
    <label
      className={classNames(classPrefix, {
        [`${classPrefix}-checked`]: checked,
        // [`${classPrefix}-indeterminate`]: props.indeterminate,
        [`${classPrefix}-disabled`]: disabled,
        [`${classPrefix}-check-disabled`]: checked && disabled,
        [`${classPrefix}-block`]: props.block,
      })}
    >
      <NativeInput
        type='checkbox'
        checked={checked}
        onChange={setChecked}
        disabled={disabled}
        id={props.id}
      />
      {renderIcon()}
      {props.children && (
        <div className={`${classPrefix}-content`}>{props.children}</div>
      )}
    </label>
  )
}
