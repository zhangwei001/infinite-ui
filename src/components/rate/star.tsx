import React, { FC } from 'react'
import { mergeProps } from '../../utils/with-default-props'

export type StarProps = {
    color?: string,
    unselectedColor?: string
    stokeColor?:string
    percent?: string
}

const defaultProps = {
    stokeColor: '',
    unselectedColor: '#f0f0f0',
    percent: '100%'
}


export const Star: FC<StarProps> = p => {
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
            <path style={{ fill: unselectedColor, stroke: stokeColor, strokeWidth: 10 }}  d="M517.870933 826.4704l223.368534 141.482667a56.2176 56.2176 0 0 0 84.992-59.630934l-60.074667-271.36 203.3664-185.105066a56.2176 56.2176 0 0 0-32.768-97.5872l-265.454933-23.893334L570.026667 79.2576a56.2176 56.2176 0 0 0-104.2432 0l-101.307734 251.050667-265.4208 23.927466a56.2176 56.2176 0 0 0-32.802133 97.5872l203.400533 185.1392-60.074666 271.325867a56.2176 56.2176 0 0 0 84.957866 59.630933l223.368534-141.482666z" p-id="1304"></path>
            <path style={{ fill: color }} mask={`url(#half_${percent})`} d="M517.870933 826.4704l223.368534 141.482667a56.2176 56.2176 0 0 0 84.992-59.630934l-60.074667-271.36 203.3664-185.105066a56.2176 56.2176 0 0 0-32.768-97.5872l-265.454933-23.893334L570.026667 79.2576a56.2176 56.2176 0 0 0-104.2432 0l-101.307734 251.050667-265.4208 23.927466a56.2176 56.2176 0 0 0-32.802133 97.5872l203.400533 185.1392-60.074666 271.325867a56.2176 56.2176 0 0 0 84.957866 59.630933l223.368534-141.482666z" p-id="1304"></path>
        </svg>
    )
}
