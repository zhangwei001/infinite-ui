import React, { FC } from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `i-step`

export type StepProps = {
  icon?: React.ReactNode
  content?: React.ReactNode
  status?: 'waiting' | 'process' | 'finished',
  renderCustomIcon?: (status?:string) => {}
} & NativeProps

export const Step: FC<StepProps> = props => {
  const { content, icon, status, renderCustomIcon } = props

  if(renderCustomIcon) {
    return withNativeProps(
      props,
      <div
        className={`${classPrefix}`}
      >
        <div className={classNames(`${classPrefix}-item`, `${classPrefix}-item-${status}`)}>
          <div className={`${classPrefix}-icon-container`}>
           {renderCustomIcon(status)}
          </div>
        </div>
       {content}
      </div>
    )
  }
  return withNativeProps(
    props,
    <div
      className={`${classPrefix}`}
    >
      <div className={classNames(`${classPrefix}-item`, `${classPrefix}-item-${status}`)}>
        <div className={`${classPrefix}-icon-container`}>
         {
          icon ? icon : <span className={`${classPrefix}-icon-dot`}></span>
        }
        </div>
      </div>
     {content}
    </div>
  )
}
