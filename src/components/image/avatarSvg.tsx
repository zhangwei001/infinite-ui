import React, { memo } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

export const AvatarSvg = memo<NativeProps>(props => {
  return withNativeProps(
    props,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" fill="none">
      <g >
        <path d="M20.9522 0H21.0492C26.8645 0 31.5815 4.71692 31.5815 10.5323C31.5815 16.3477 26.8645 21.0646 21.0492 21.0646H20.9522C15.1368 21.0646 10.4199 16.3477 10.4199 10.5323C10.4199 4.71692 15.1368 0 20.9522 0Z" fill="#E6E8EA" />
        <path d="M42 41.9977H0V38.0884L0.759231 35.6007C2.74615 30.2215 9.25615 23.6953 15.1038 23.6953H26.8962C32.7438 23.6953 39.2538 30.2376 41.2408 35.6007L42 38.0884V41.9977Z" fill="#E6E8EA" />
      </g>
    </svg>
  )
})


