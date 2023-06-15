import React, { memo } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

export const IndeterminateIcon = memo<NativeProps>(props => {
  return withNativeProps(
    props,
    <svg viewBox='0 0 40 40'>
      <path
        d='M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z'
        fill='currentColor'
      />
    </svg>
  )
})

export const IndeterminateBoxIcon = memo<NativeProps>(props => {
  return withNativeProps(
    props,
    <svg viewBox='0 0 36 36'>
      <path d="M5 6 H 30 V 30 H 6 L 6 6" fill='currentColor'/>
    </svg>
  )
})
