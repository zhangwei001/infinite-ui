import React, { FC } from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { usePropsValue } from '../../utils/use-props-value'

import { Star } from './star'
import { AriseStar } from './arise-star'

const classPrefix = `i-rate`

export type RateProps = {
  type?: string
  count?: number
  color?: string
  unselectedColor?: string
  stokeColor?:string
  defaultValue?: number
  readOnly?: boolean
  value?: number
  allowClear?: boolean
  style?: React.CSSProperties
  onChange?: (value: number) => void
} & NativeProps<'--star-size'| '--star-padding'>

const defaultProps = {
  count: 5,
  color: 'var(--i-star_fill_color)',
  unselectedColor: '#f0f0f0',
  defaultValue: 0,
  readOnly: false,
  allowClear: true,
}

export const Rate: FC<RateProps> = p => {
  const props = mergeProps(defaultProps, p)
  const [value, setValue] = usePropsValue(props)
  const starList = Array(props.count).fill(null)
  const formatValue = value || props.defaultValue;
  const percent = Math.ceil(formatValue % 1 * 100) + '%'

  function renderStar(v: number) {
    const deciml = v - formatValue;
    if (props.type === 'arise') {
      if (deciml > 0) {
        if (deciml < 1) {
          return <AriseStar color={props.color} percent={percent} unselectedColor={props.unselectedColor} stokeColor={props.stokeColor} />;
        }
        return <AriseStar  unselectedColor={props.unselectedColor} stokeColor={props.stokeColor} />
      } else {
        return <AriseStar color={props.color} unselectedColor={props.unselectedColor} stokeColor={props.stokeColor} />
      }
    }
    if (deciml > 0) {
      if (deciml < 1) {
        return <Star color={props.color} percent={percent} unselectedColor={props.unselectedColor} stokeColor={props.stokeColor} />;
      }
      return <Star unselectedColor={props.unselectedColor} stokeColor={props.stokeColor} />
    } else {
      return <Star color={props.color} unselectedColor={props.unselectedColor} stokeColor={props.stokeColor} />
    }
  }

  return withNativeProps(
    props,
    <div className={classPrefix}>
      {starList.map((_, i) =>{
        return (
          <div key={i} style={props.style} className={classNames(`${classPrefix}-star`)}>
            <div className={classNames(`${classPrefix}-star-item`)} onClick={() => {
              if (props.readOnly) return
              if (formatValue % 1 > 0) return
              if (props.allowClear && value === (i+1)) {
                setValue(0)
              } else {
                setValue(i+1)
              }
            }}>
            {renderStar(i + 1)}
          </div>
        </div>
        )
      })}
    </div>
  )
}
