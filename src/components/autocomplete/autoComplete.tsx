import React, { FC } from 'react';
import { mergeProps } from '../../utils/with-default-props'
import Input, { InputProps } from '../input';
import { NativeProps, withNativeProps } from '../../utils/native-props'
import Dropdown from '../dropdown';


const classPrefix = 'i-auto-complete';


export type AutoCompleteProps = {
  children?: React.ReactNode[]
  dropdownClassName?: string
  notFoundContent?: React.ReactNode | null
  open?: boolean
  options?: Array<any>
  onSearch: (value: string | null) => void
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

const AutoComplete: FC<AutoCompleteProps> = p => {
  const props = mergeProps(defaultProps, p)
  
  return withNativeProps(
    props,
    <div className={classPrefix} >
      <Dropdown 
        {...props}
        basiccomp={<Input className={props.className}/>}
      />
    </div>
  )
}

export default AutoComplete;

