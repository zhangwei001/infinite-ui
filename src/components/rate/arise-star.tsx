import React, { FC } from 'react'
import { mergeProps } from '../../utils/with-default-props'

export type StarProps = {
    color?: string,
    unselectedColor?:string,
    stokeColor?:string
    percent?: string
}

const defaultProps = {
    color: '',
    stokeColor: '',
    unselectedColor: '#f0f0f0',
    percent: '100%'
}

export const AriseStar: FC<StarProps> = p => {
    const props = mergeProps(defaultProps, p)
    const percent = props.percent;
    const unselectedColor = props.unselectedColor;
    let color = props.color;
    let stokeColor = unselectedColor;
    
    if (!percent) {
        if (color) {
            stokeColor = color 
        } else {
            color = unselectedColor
        }
    } else {
        if (!color) {
            color = unselectedColor
        } else {
            stokeColor = color
        }
    }
    if(props.stokeColor) {
        stokeColor = props.stokeColor
    }
    return (
        <svg width="100%" height="100%" viewBox="0 0 1024 1024">
            {props.percent != '100%' ? <mask id={`half_${percent}`}>
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect x={percent} y="0" width="100%" height="100%" fill="black" />
            </mask> : null}
            <path style={{ fill: unselectedColor, stroke: stokeColor, strokeWidth: 10 }}  d="M512 61.44l161.85344 276.48L988.16 405.63712l-214.272 238.592L806.28224 962.56 512 833.536 217.71776 962.56l32.39424-318.33088L35.84 405.63712 350.14656 337.92 512 61.44z" p-id="1926"></path>
            <path style={{ fill: color }} mask={`url(#half_${percent})`} d="M512 61.44l161.85344 276.48L988.16 405.63712l-214.272 238.592L806.28224 962.56 512 833.536 217.71776 962.56l32.39424-318.33088L35.84 405.63712 350.14656 337.92 512 61.44z" p-id="1926"></path>
        </svg>
    )
}

