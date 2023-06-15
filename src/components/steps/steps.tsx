import React, { Children, FC, useState } from 'react'
import classNames from 'classnames'
import { StepProps } from './step'

import { NativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'


const classPrefix = 'i-steps'

export type StepsProps = {
    direction?: 'vertical' | 'horizontal'
    activeIcon?: React.ReactElement
    inActiveIcon?: React.ReactElement
    activeIndex?: number
    renderCustomIcon?: (status?:string) => {}
} & NativeProps

const defaultProps = {
    activeIndex: 0,
    direction: 'vertical',
}


export const Steps: FC<StepsProps> = p => {
    const props = mergeProps(defaultProps, p)
    const { direction, activeIcon, inActiveIcon, activeIndex, renderCustomIcon } = props
    return (
        <div className={classNames(classPrefix, `${classPrefix}-${direction}`, props.className)}>
            {React.Children.map(props.children, (child, index) => {
                if (!React.isValidElement(child)) {
                    return child
                }
                const childProps = child.props as StepProps
                let icon = childProps.icon
                let status = childProps.status
                const isCurrent = index === activeIndex
                if (inActiveIcon) {
                    icon = inActiveIcon
                }
                if (index < activeIndex) {
                    status = 'finished'
                } else if (isCurrent) {
                    status = 'process'
                    if (activeIcon) {
                        icon = activeIcon
                    }
                } else {
                    status = 'waiting'
                }
                return React.cloneElement(child, {
                    icon,
                    status,
                    renderCustomIcon
                })
            })}
        </div>
    )
}

