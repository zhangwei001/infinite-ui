import classNames from 'classnames';
import React, {
  useState, FC
} from 'react';
import { mergeProps,omitProps } from '../../utils/with-default-props'
import Input, { InputProps } from '../input';

import { NativeProps, withNativeProps } from '../../utils/native-props'
import Dropdown from '../dropdown';
import { IconArrow } from '@ali/super-icon';


const classPrefix = 'i-select';


export type SelectProps = {
  children?: React.ReactNode[]
  dropdownClassName?: string
  notFoundContent?: React.ReactNode | null
  open?: boolean
  options?: Array<any>
  onSearch?: (value: string | null) => void
  onSelect?: (value: string | null, label?: string) => void
  autoFocus?: boolean

} & NativeProps & InputProps

const defaultProps = {
  allowClear: false,
  notFoundContent: null,
  open: false,
  value: '',
  autoFocus: false
}
export interface DataSourceItemObject {
  label?: string;
  value: string;
}

const Select: FC<SelectProps> = p => {
  const props = mergeProps(defaultProps, p)
  const [showDropdown, setShowDropdown] = useState(false); 

  const inputCom = () => {
    return (
    <Input 
      actionIcon={
        <div className={classNames(`${classPrefix}-icon`, {
          [`${classPrefix}-icon-down`]: !showDropdown,
          [`${classPrefix}-icon-up`]: showDropdown
        })}
          onClick={()=>{
            props.onSearch?.(props.value)
            setShowDropdown( val => !val)
          }}
        >
          <IconArrow size={16} color='#1E71FF' />
        </div>
      }

    />
    )
    
  }
  
  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
      })}
    >

      <Dropdown 
        {...props}
        open={showDropdown}
        onSearch={()=>{
          props.onSearch?.(props.value)
        }}
        basiccomp={inputCom()}
        onChange={(e)=>{
          props.onChange?.(e);
        }}
        onSelect={(v)=>{
          setShowDropdown(false);
        }}
        onFocus={()=>{
          props.onSearch?.(props.value)

          setShowDropdown(true)}}
        onBlur={()=>setShowDropdown(false)}
      />
    </div>
  )
}

export default Select;

