import React, { memo } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

export const PlaceholderSvg = memo<NativeProps>(props => {
  return withNativeProps(
    props,
    <svg viewBox="0 0 87 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M85.4682 10.1531L85.4249 10.1289C84.843 9.77444 71.1676 1.47154 69.1756 0.362513C68.7453 0.123523 68.3015 0.00268528 67.8549 0.00268528C67.1377 0.00268528 66.6127 0.324919 66.6073 0.324919C66.4584 0.418904 51.7112 9.64823 49.4135 10.8593C47.6273 11.8018 45.8492 12.2905 43.4973 12.2905C41.1454 12.2905 40.0575 11.9092 38.1711 11.1869C35.8219 10.2873 20.4117 0.338346 20.3846 0.319549C20.3792 0.319549 19.8596 0 19.1451 0C18.6985 0 18.2547 0.120838 17.8244 0.359828C16.0706 1.33727 5.06097 8.0102 1.72939 10.0322L1.51288 10.1638C1.45063 10.1987 0 11.0553 0 12.8706V42.5859C0 42.645 0.0324768 44.0306 1.84847 45.0215C3.13943 45.725 37.1778 66.9092 41.7679 69.5381C42.2957 69.8416 42.8965 70 43.5 70C44.1035 70 44.7016 69.8389 45.2321 69.5381C49.8384 66.9012 83.8552 45.7277 85.1515 45.0215C86.9675 44.0306 87 42.6423 87 42.5832V12.8706C87 11.0634 85.6252 10.2417 85.4682 10.1531V10.1531ZM44.2145 35.5746L43.3241 65.2846L42.4337 35.5746L4.72808 14.2132L43.3268 34.0333L81.9255 14.2132L44.2172 35.5746H44.2145Z" fill="#E6E8EA" />
    </svg>
  )
})