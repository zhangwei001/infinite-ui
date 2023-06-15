import React, {
  FC,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react'

import { mergeProps } from '../../utils/with-default-props'
import {
  GetContainer,
  renderToContainer,
} from '../../utils/render-to-container'
import Mask from '../mask'
import SafeArea from '../safe-area'
import { Slide } from './slide'
import { Slides, SlidesRef } from './slides'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `i-image-viewer`


export type ImageViewerProps = {
  image?: string
  maxZoom?: number
  getContainer?: GetContainer
  visible?: boolean
  disableBodyScroll?: boolean
  stopPropagation?: PropagationEvent[]
  onClose?: () => void
  afterClose?: () => void
  onEndChange?: (movePercent: number) => void
  renderRight?: () => React.ReactNode
  renderHeader?: (image: string) => React.ReactNode
  renderFooter?: (image: string) => React.ReactNode
}

const defaultProps = {
  maxZoom: 3,
  disableBodyScroll: false,
  getContainer: null,
  visible: false,
}

export const ImageViewer: FC<ImageViewerProps> = p => {
  const props = mergeProps(defaultProps, p)

  const node = (
    <Mask
      visible={props.visible}
      disableBodyScroll={props.disableBodyScroll}
      afterClose={props.afterClose}
    >
      {props.image && (
        <div className={`${classPrefix}-footer`}>
          <SafeArea position='top' />
          {props.renderHeader?.(props.image)}
        </div>
      )}
      <div className={`${classPrefix}-content`}>
        {props.image && (
          <Slide
            image={props.image}
            onTap={() => {
              props.onClose?.()
            }}
            maxZoom={props.maxZoom}
          />
        )}
      </div>
      {props.image && (
        <div className={`${classPrefix}-footer`}>
          {props.renderFooter?.(props.image)}
          <SafeArea position='bottom' />
        </div>
      )}
    </Mask>
  )
  return renderToContainer(props.getContainer, node)
}

export type MultiImageViewerRef = SlidesRef

export type MultiImageViewerProps = Omit<
  ImageViewerProps,
  'image' | 'renderFooter' | 'renderHeader'
> & {
  images?: string[]
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  onEndChange?: (movePercent: number) => void
  renderRight?: () => React.ReactNode
  renderHeader?: (image: string, index: number) => React.ReactNode
  renderFooter?: (image: string, index: number) => React.ReactNode
}

const multiDefaultProps = {
  ...defaultProps,
  defaultIndex: 0,
}
export const MultiImageViewer = forwardRef<
  MultiImageViewerRef,
  MultiImageViewerProps
>((p, ref) => {
  const props = mergeProps(multiDefaultProps, p)
  const [index, setIndex] = useState(props.defaultIndex)

  const slidesRef = useRef<SlidesRef>(null)
  useImperativeHandle(ref, () => ({
    swipeTo: (nextIndex: number, immediate?: boolean) => {
      setIndex(nextIndex)
      slidesRef.current?.swipeTo(nextIndex, immediate)
    },
  }))

  const onSlideChange = useCallback(
    (nextIndex: number) => {
      setIndex(nextIndex)
      props.onIndexChange?.(nextIndex)
    },
    [props.onIndexChange]
  )

  const node = withStopPropagation(
    props.stopPropagation || ['click'],
    (<Mask
      visible={props.visible}
      disableBodyScroll={props.disableBodyScroll}
      afterClose={props.afterClose}
      onMaskClick={() => {
        console.log('mask')
      }}
    >
      {props.images && (
        <div className={`${classPrefix}-header`}>
          <SafeArea position='top' />
          {props.renderHeader?.(props.images[index], index)}
        </div>
      )}
      <div className={`${classPrefix}-content`}>
        {props.images && (
          <Slides
            ref={slidesRef}
            defaultIndex={index}
            onIndexChange={onSlideChange}
            onEndChange={props.onEndChange}
            images={props.images}
            onTap={() => {
              props.onClose?.()
            }}
            maxZoom={props.maxZoom}
          />
        )}
        {props.renderRight && props.renderRight()}
      </div>
      {props.images && (
        <div className={`${classPrefix}-footer`}>
          {props.renderFooter?.(props.images[index], index)}
          <SafeArea position='bottom' />
        </div>
      )}
    </Mask>
    )
  )
  return renderToContainer(props.getContainer, node)
})
