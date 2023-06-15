import { mergeProps } from '../../utils/with-default-props'
import React, { FC, useState, useRef } from 'react'
import classNames from 'classnames'
import { useUpdateLayoutEffect } from 'ahooks'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { toCSSLength } from '../../utils/to-css-length'
import { LazyDetector } from './lazy-detector'
import { compressImg } from './lzd-only/compress'
import { Placeholder } from './placeholder'
import { PlaceholderSvg } from './placeholderSvg'
import { AvatarSvg } from './avatarSvg'
import { LazadaSmallSvg } from './lazadasmallSvg'

const classPrefix = `i-image`

export type ImageProps = {
  src: string
  type?: string
  width?: number | string
  height?: number | string
  compress?: {
    width?: number
    height?: number
    quality?: string
  }
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholder?: string
  placeholderType?: 'light' | 'dark'
  fallback?: string
  lazy?: boolean
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  svgType?: 'large' | 'small' | 'avatar'
} & NativeProps<'--width' | '--height'> &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    | 'crossOrigin'
    | 'decoding'
    | 'loading'
    | 'referrerPolicy'
    | 'sizes'
    | 'useMap'
  >

const defaultProps = {
  fit: 'fill',
  lazy: false,
  svgType: 'large'
}

export const Image: FC<ImageProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { svgType } = props;
  const type = props.type || '';
  const placeholderType = props.placeholderType || ''

  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [isImgHide, setIsImgHide] = useState(true);

  const ref = useRef<HTMLDivElement>(null)
  const width = props.width
  const height = props.height
  const compress = props.compress
  let src: string | undefined = props.src

  const [init, setInitialized] = useState(!props.lazy)
  const style: ImageProps['style'] = {}

  if (width) {
    style['--width'] = toCSSLength(width)
  }
  if (height) {
    style['--height'] = toCSSLength(height)
  }

  src = init ? props.src : undefined

  useUpdateLayoutEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [src])

  function renderImg() {
    if (failed && type !== 'arise') {
      src = (p && p.fallback) || props.placeholder;
      if (!src) {
        return (
          <div className={classNames(`${classPrefix}-svg`, props.className)}>
            <div className={`${classPrefix}-svg-container-${svgType}`}>
              {svgType === 'large' && <PlaceholderSvg />}
              {svgType === 'small' && <LazadaSmallSvg />}
              {svgType === 'avatar' && <AvatarSvg />}
            </div>
          </div>
        )
      }
    }
    if (failed && type === 'arise') {
      src = (p && p.fallback)
    }
    if (!loaded) {
      if (props.placeholder) src = props.placeholder;
    }
    if (compress && compress.width && compress.height) {
      src = init ? compressImg(props.src, compress) : undefined
    }
    // if (src && (!src.match(/base64|_\.webp/)) && isSupportWebp()) {
    //   src = `${src}_.webp`
    // }
    const img = (
      <img
        className={classNames(`${classPrefix}-img`, props.className, {
          'i-img-hide': isImgHide
        }
        )}
        src={src}
        onClick={props.onClick}
        onLoad={() => {
          setLoaded(true)
          setIsImgHide(false)
        }}
        onError={e => {
          setFailed(true)
          setIsImgHide(true)
          props.onError?.(e)
        }}
        style={{
          objectFit: props.fit,
          display: loaded ? 'block' : 'none',
        }}
        crossOrigin={props.crossOrigin}
        decoding={props.decoding}
        loading={props.loading}
        referrerPolicy={props.referrerPolicy}
        sizes={props.sizes}
        useMap={props.useMap}
      />
    )
    if (type === 'arise') {
      if (failed && !p.fallback) {
        return <div className="i-img-arise-placeholder"><Placeholder  /></div>
      }
    }
    return (
      <>
        {type === 'arise' && (!loaded || failed) && <div className="i-img-arise-placeholder"><Placeholder  /></div>}
        {img}
        {type !== 'arise' && <div className={classNames(`${classPrefix}-svg`, props.className, {
          'i-img-hide': !isImgHide
        })}>
          <div className={`${classPrefix}-svg-container-${svgType}`}>
            {svgType === 'large' && <PlaceholderSvg />}
            {svgType === 'small' && <LazadaSmallSvg />}
            {svgType === 'avatar' && <AvatarSvg />}
          </div>
        </div>}
      </>
    )
  }

  return withNativeProps(
    props,
    <div ref={ref} className={classNames(`${classPrefix}`, `${classPrefix}-${props.type}`, `${classPrefix}-img-${placeholderType}`)} style={style}>
      {props.lazy && !init && (
        <LazyDetector
          onActive={() => {
            setInitialized(true)
          }}
        />
      )}
      {renderImg()}
    </div>
  )
}
