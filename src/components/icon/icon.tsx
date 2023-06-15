import React, { FC } from 'react'
import classNames from 'classnames'

import { ElementProps } from '../../utils/element-props'
import { mergeProps } from '../../utils/with-default-props'


const classPrefix = 'i-icon'

export type IconProps  = {
  type?:  'bottombar-account'
  | 'bottombar-home'
  | 'bottombar-bag'
  | 'bottombar-search'
  | 'bottombar-wishlist'
  | 'info-failtosend'
  | 'info-notification'
  | 'info-warning'
  | 'info-error'
  | 'info-info'
  | 'arise-menu'
  | 'arise-addtobag'
  | 'arise-address'
  | 'arise-alerts'
  | 'arise-camera'
  | 'arise-camera-fill'
  | 'arise-category'
  | 'arise-chatwithsellers'
  | 'arise-chathistory'
  | 'arise-contact'
  | 'arise-chats'
  | 'arise-process'
  | 'arise-copy'
  | 'arise-edit'
  | 'arise-feedback'
  | 'arise-delete'
  | 'arise-delivery'
  | 'arise-filter'
  | 'arise-message'
  | 'arise-like'
  | 'arise-helpcenter'
  | 'arise-freeshipping'
  | 'arise-more'
  | 'arise-order-fill'
  | 'arise-order'
  | 'arise-oneinaraw'
  | 'arise-package-fill'
  | 'arise-package'
  | 'arise-postcode'
  | 'arise-photo'
  | 'arise-photo-fill'
  | 'arise-send-fill'
  | 'arise-see'
  | 'arise-refound'
  | 'arise-return'
  | 'arise-read'
  | 'arise-promos'
  | 'arise-send'
  | 'arise-store'
  | 'arise-twoinraw'
  | 'arise-share'
  | 'arise-setting'
  | 'arise-unsee'
  | 'arise-voucher-fill'
  | 'arise-video'
  | 'arise-voucher'
  | 'arise-volume-fill'
  | 'arise-mute-fill'
  | 'arise-pause-fill'
  | 'arise-play-fill'
  | 'arise-arrow-right'
  | 'deleteone-fill-highlight'
  | 'back-fill'
  | 'close'
  | 'arise-add'
  | 'ar-star'
  | 'ar-like'
  | 'minus'
  | 'plus'
  | 'delete'
  | 'smallscreen'
  | 'play'
  | 'mute'
  | 'fullscreen'
  | 'sound'
  | 'pause'
  | 'search'
  | 'store'
  | 'info'
  | 'sort'
  | 'layout'
  | 'more'
  | 'like'
  | 'star'
  | 'arrow'
  | 'close-border'
  | 'notice'
  | 'success'
  | 'error'
  | 'warn'
  | 'chat'
  | 'arrow-light'
  | 'cart';
  size?: 'smaller' | 'small' | 'middle' | 'large' | 'larger'
} & ElementProps

const defaultProps = {
    size: 'large'
}


export const Icon: FC<IconProps> = p => {
    const props = mergeProps(defaultProps, p)
    return (
      <i style={props.style} className={classNames(
        classPrefix,
        `${classPrefix}-${props.type}`,
        `${classPrefix}-${props.size}`,
        props.className
      )}></i>
    )
  }
  