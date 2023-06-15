import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react"
import classNames from "classnames"
import { mergeProps } from "../../utils/with-default-props"
import { NativeProps, withNativeProps } from '../../utils/native-props'
import CustomVideo from './components/video'

const classPrefix = 'i-video'

export type VideoProps = {
  src?: string
  poster?: string
  controls?: boolean
  hasFullScreen?: boolean
  playsInline?: boolean
  muted?: boolean
  autoPlay?: boolean
  loop?: boolean
  playControl?: string
  hideMore?: boolean
  onPlay?: () => void
  onEnded?: () => void
  onPause?: () => void
  onError?: (error: any) => void
  custom?: boolean
} & NativeProps

export type VideoRef = {
  play?: () => void
  pause?: () => void
}

const defaultProps = {
  controls: false,
  playsInline: false,
  hasFullScreen: false,
  muted: true,
  autoPlay: false,
  loop: false,
  hideMore: true,
  custom: false
}

export const Video = forwardRef<VideoRef, VideoProps>((p: VideoProps, ref) => {
  const props = mergeProps(defaultProps, p)
  const { custom, src, muted, controls, hasFullScreen, hideMore, playsInline, poster, autoPlay, loop, playControl, onPlay, onEnded, onPause, onError } = props;

  const refEl = useRef(null);
  const controlsList = hideMore ? "nodownload noremoteplayback noplaybackrate" : "";
  const disablePictureInPicture = hideMore;
  useEffect(() => {
    const node: any = refEl.current;
    if (playControl) {
      if (playControl === 'play') {
        // Should return a Promise https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
        const playPromis = node?.play()
        if (playPromis) {
          playPromis.catch((error: any) => {
            onError && onError(error);
          })
        }
      } else {
        node?.pause();
      }
    }
  }, [playControl])

  useImperativeHandle(ref, () => ({
    play: () => {
      const node: any = refEl.current;
      const playPromis = node?.play()
      if (playPromis) {
        playPromis.catch((error: any) => {
          onError && onError(error);
        })
      }
    },
    pause: () => {
      const node: any = refEl.current;
      node?.pause();
    },
  }))
  if (custom) {
    const refInfo = ref ? ref : undefined
    return withNativeProps(props, 
      <CustomVideo 
        refInfo={refInfo}
        playControl={playControl}
        hasFullScreen={hasFullScreen}
        src={src}
        controls={controls}
        playsInline={playsInline}
        poster={poster}
        autoPlay={playControl === 'play' || autoPlay}
        loop={loop}
        muted={muted}
        onPlay={onPlay}
        onEnded={onEnded}
        onPause={onPause}
        onError={onError}
        className={classNames(classPrefix)}>
      </CustomVideo>)
  }
  return withNativeProps(props,
    <video
      ref={refEl}
      src={src}
      controls={controls}
      controlsList={controlsList}
      playsInline={playsInline}
      poster={poster}
      disablePictureInPicture={disablePictureInPicture}
      autoPlay={playControl === 'play' || autoPlay}
      loop={loop}
      muted={muted}
      onPlay={onPlay}
      onEnded={onEnded}
      onPause={onPause}
      onError={onError}
      className={classNames(classPrefix)}>
    </video>)
}
)