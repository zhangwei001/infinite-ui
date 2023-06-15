import React, { FC } from 'react'
import { mergeProps } from '../../../utils/with-default-props'
export type IconStarProps = {
    color?: string,
}

const defaultProps = {
    color: '#f0f0f0'
}


export const IconSort: FC<IconStarProps> = p => {
    const props = mergeProps(defaultProps, p)
    return <i className="icon i-icon i-icon-sort"></i>
}
