import React, { FC } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { CheckIcon } from '../checkbox/check-icon'
import { HotIcon } from './hot-icon'

const classPrefix = `i-progress-bar`

export type ProgressBarProps = {
  percent?: number
  type?: 'normal' | 'fire'
} & NativeProps<'--track-width' | '--fill-color' | '--background-color'>


const defaultProps = {
  percent: 0,
  type: 'normal' ,
}

export const ProgressBar: FC<ProgressBarProps> = p => {
  const props = mergeProps(defaultProps, p)
  const fillStyle = {
    width: props.percent>100 ? '100%' :`${props.percent}%`,
  }

  return withNativeProps(
    props,
    <div className={classPrefix}>
      <div className={`${classPrefix}-trail`}>
        <div className={`${classPrefix}-fill`} style={fillStyle} >
          {props.type === 'fire' && <div className='hot-icon-pos'>
            <HotIcon />  
          </div>}
        </div>
      </div>
    </div>
  )
}

