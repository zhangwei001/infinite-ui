import React, { memo } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

export const HotIcon = memo<NativeProps>(props => {
  return withNativeProps(
    props,
    <svg  viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 18.8404C24 25.0035 18.6274 29.9997 12 29.9997C5.37258 29.9997 0 25.0035 0 18.8404C-3.18991e-06 5.28981 16 0 16 0C16 0 16 9.13035 18.6667 13.0434C18.6667 13.0434 20.8807 12.6086 22.6667 11.0869C22.6667 11.0869 24 15.2053 24 18.8404Z" fill="url(#paint0_linear_1232_1123)" />
      <path d="M11.5755 22.5847C13.1622 25.6237 18.3031 25.547 18.3031 25.547C14.6593 28.7907 7.97557 29.0496 5.86058 24.9988C4.21975 21.8562 5.76778 16.5177 9.19722 13.0605C9.19722 13.0605 9.6611 18.9181 11.5755 22.5847Z" fill="url(#paint1_linear_1232_1123)" />
      <defs>
        <linearGradient id="paint0_linear_1232_1123" x1="12" y1="1.30434" x2="12" y2="29.9997" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FE4960" />
          <stop offset="1" stopColor="#F99171" />
        </linearGradient>
        <linearGradient id="paint1_linear_1232_1123" x1="6.26483" y1="14.5184" x2="14.2817" y2="32.721" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDECB1" />
          <stop offset="1" stopColor="#FDECB1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
})
