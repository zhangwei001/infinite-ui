import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import { NativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'
import { IconCloseBorder, IconEyeOpen, IconEyeClose } from '@ali/super-icon'
const classPrefix = 'i-input'

export type InputProps = Pick<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'autoComplete' | 'disabled' | 'readOnly' | 'onFocus' | 'onBlur'
> & {
  onChange?: (val: string) => void
  bordered?: boolean
  disabled?: boolean
  allowClear?: boolean
  Integer?: boolean,
  value?: string
  defaultValue?: string
  placeholder?: string
  type?: string

  maxLength?: number
  showCount?: boolean | ((length: number, maxLength?: number) => ReactNode)
  id?: string
  prefix?: string
  suffix?: string
  actionIcon?: ReactNode
} & NativeProps<
  '--font-size' | '--color' | '--placeholder-color' | '--disabled-color'
>


export type InputRef = {
  clear: () => void
  focus: () => void
  blur: () => void
}

const defaultProps = {
  bordered: true,
  disabled: false,
  allowClear: false,
  showCount: false,
  Integer: false,
  defaultValue: '',

}

export const Input = forwardRef<InputRef, InputProps>(
  (p: InputProps, ref) => {
    const props = mergeProps(defaultProps, p)
    const {
      className,
      style,
      defaultValue: outerDefaultValue,
      value: outerValue,
      onChange: outerOnChange,
      showCount,
      bordered,
      disabled,
      allowClear,
      Integer,
      prefix,
      suffix,
      actionIcon,
      placeholder,
      type,
      ...InputProps
    } = props
    const [value, setValue] = usePropsValue(props)
    const nativeInputRef = useRef<HTMLInputElement>(null)
    const [isFocus, setIsFocus] = useState(false);
    const [showPass, setShowPass] = useState(false);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setValue('')
      },
      focus: () => {
        nativeInputRef.current?.focus()
      },
      blur: () => {
        nativeInputRef.current?.blur()
      },
    }))

    // useEffect(() => {
    //   const Input = nativeInputRef.current
    //   if (!Input) return
    //   Input.style.height = 'auto'
    //   let height = Input.scrollHeight
    //   Input.style.height = `${height}px`
    // }, [value])


    let count
    if (showCount && typeof showCount === 'function') {
      count = showCount(value.length, props.maxLength)
    } else if (showCount) {
      count = (
        <div className={`${classPrefix}-count`}>
          {props.maxLength === undefined
            ? value.length
            : value.length + '/' + props.maxLength}
        </div>
      )
    }

    let clear
    if (allowClear) {
      clear = (
        <div className={`${classPrefix}-widget-icon`} onClick={() => { setValue('') }}><IconCloseBorder size={15} color='#858B9C'/></div>
       )
    }


    const bindInputValue = (inputVal: string) => {
      if (Integer) {
        const reg = /[^0-9]/g;
        inputVal = inputVal.replace(reg, '')
        setValue(inputVal)
        return
      }
      setValue(inputVal)
    }

    return (
      <div
        className={classNames(
          `${classPrefix}-wrapper`,
          className,
          !bordered && `${classPrefix}-no-border`,
          disabled && `${classPrefix}-disabled`,
          {
            [`${classPrefix}-wrapper-focus`]: isFocus
          }
        )}
        style={style}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);

        }}
      >
        {prefix && <div className={classNames(`${classPrefix}-pre-suffix`, `${classPrefix}-border-right`, {
          [`${classPrefix}-no-border`]: disabled
        })}>
          {prefix}
        </div>}
        <div className={`${classPrefix}-container`}>
          <input
            ref={nativeInputRef}
            {...InputProps}
            placeholder={disabled? undefined: placeholder}
            className={classNames(classPrefix, 'border-1px', { [`${classPrefix}-padding`]: allowClear })}
            disabled={disabled}
            type={showPass? 'text' : type}
            value={value}
            onChange={e => {
              bindInputValue(e.target.value)
            }}
            onFocus={e => {

              props.onFocus?.(e)
            }}
            onBlur={e => {
              props.onBlur?.(e)
            }}
            id={props.id}
          />
          <div className={`${classPrefix}-widget`}>
            {count}
            {value && clear}
            { props.type === 'password' && (
              <div className={`${classPrefix}-widget-icon`} onClick={()=>setShowPass((v)=>!v)}>
                {showPass ? <IconEyeOpen size={15} color='#858B9C'/> :<IconEyeClose size={15} color='#858B9C' /> }
              </div>
            )}
          </div>
          {actionIcon && actionIcon}
        </div>
        {suffix && <div className={classNames(`${classPrefix}-pre-suffix`, `${classPrefix}-border-left`, {
          [`${classPrefix}-no-border`]: disabled

        })}>
          {suffix}
        </div>}

      </div>
    )
  }
)

Input.defaultProps = defaultProps
