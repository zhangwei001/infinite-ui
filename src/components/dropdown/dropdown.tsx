import classNames from 'classnames';
import React, {
  cloneElement,
  useEffect, useRef, useState, useMemo, FC
} from 'react';
import { mergeProps, omitProps } from '../../utils/with-default-props'
import { InputProps } from '../input';
import Popup from '../popup';
import Option from './option';
import { NativeProps, withNativeProps } from '../../utils/native-props'


const classPrefix = 'i-dropdown';


export type DropdownProps = {
  children?: React.ReactNode[]
  dropdownClassName?: string
  notFoundContent?: React.ReactNode | null
  open?: boolean
  options?: Array<any>
  onSearch: (value: string | null) => void
  onSelect?: (value: string | null, label?: string) => void
  autoFocus?: boolean
  basiccomp: React.ReactNode
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

const Dropdown: FC<DropdownProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { options, notFoundContent, children, open, value, basiccomp } = props

  // 计算 navs 的 top 值
  const [popupPos, setPopupPos] = useState({})
  const [popupVisible, setPopupVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (value || popupVisible ) {
      const rect = container.getBoundingClientRect()
      setPopupPos({
        width: rect.width,
        top: rect.bottom,
        left: rect.left
      })
    }
  }, [value, popupVisible])



  const appendOptionProps = (child: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {
    const childProps = {
      ...child.props,
      onMouseDown: () => {
        props.onSelect?.(child.props?.value, child.props?.label ? child.props?.label : null);
        props.onChange?.(child.props?.value)
      },
    }
    return cloneElement(child, childProps)
  }

  const optionChildren = useMemo(() => {
    if (children) {
      return React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
          return appendOptionProps(child);
        } else {
          return child
        }
      })
    }
    return (options && options.length > 0)
      ? options.map((item, idx) => {
        if (React.isValidElement(item)) {
          return appendOptionProps(item);
        }
        switch (typeof item) {
          case 'string':
            return (
              <Option key={`${item}_${idx}`} value={item} onMouseDown={() => {
                props.onSelect?.(item, `${item}_${idx}`);
                props.onChange?.(item)
              }}>
                {highlight(value, item)}
              </Option>
            );
          case 'object': {
            const { value: optionValue, label = null } = item as DataSourceItemObject;
            return (
              <Option
                key={label ? label : `${optionValue}_${idx}`}
                value={optionValue}
                onMouseDown={() => {
                  props.onSelect?.(optionValue, label ? label : `${optionValue}_${idx}`);
                  props.onChange?.(optionValue)
                }}
              >
                {highlight(value, optionValue)}
              </Option>
            );
          }
          default:
            return undefined;
        }
      })
      : (notFoundContent);
  }
    , [options, children])

  const showPopup = () => {
    setPopupVisible(true)
  }

  const hidePopup = () => {
    setPopupVisible(false)
  }

  const appendCompProps = (child: any, extra: any) => {
    const childProps = {
      ...child.props,
      ...extra
    }
    return cloneElement(child, childProps)
  }

  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-open`]: !!value,
      })}
      ref={containerRef}
    >
      {appendCompProps(basiccomp, {
        ...omitProps(props, ['children', 'dropdownClassName', 
        'notFoundContent','open','options','onSearch','onSelect','basiccomp']),
        onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => {
          props.onFocus?.(e)
          showPopup()
        },
        onChange: (val: string ) => {
          props.onChange?.(val)
          props.onSearch?.(val)
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => {
          props.onBlur?.(e)
          hidePopup()
        }
      })}

      {optionChildren &&
      <Popup
        visible={open ||  popupVisible && (!!value || !!notFoundContent)}
        position='top'
        className={`${classPrefix}-popup`}
        maskClassName={`${classPrefix}-popup-mask`}
        bodyClassName={classNames(`${classPrefix}-popup-body`, props.dropdownClassName)}
        style={popupPos}
        maskStyle={{ backgroundColor: 'none' }}
      >
        {optionChildren}
      </Popup>
      
      }
    </div>
  )
}

export default Dropdown;

const highlight = (key: string , title: string) => {
  if(!key) return <span className={`${classPrefix}-search-default`}>{title}</span>
  const index = title.toLowerCase().indexOf(key.toLowerCase());
  const l = key.length;
  if(index=== -1) return <span className={`${classPrefix}-search-default`}>{title}</span>
  return (
    <>
      <span className={`${classPrefix}-search-default`}>{title.substring(0, index)}</span>
      <span className={`${classPrefix}-search-highlight`}>{title.substring(index, index + l)}</span>
      <span className={`${classPrefix}-search-default`}>{title.substring(index + l, title.length)}</span>
    </>
  );
};