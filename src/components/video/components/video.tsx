import React, { FC, Ref, useContext, useEffect, useRef } from "react";
import { GlobalStoreContext, GlobalStoreProvider } from "./store";
import Poster from './poster'
import Player from './player'
import PlayBtn from './playBtn'
import Controls from './controls'
import { NativeProps } from '../../../utils/native-props'
import { mergeProps } from "../../../utils/with-default-props"
import { startFullScreen, alreadyFullScreen } from "../utils/fullscreen";

import './index.less';

export type VideoProps = {
  src?: string
  poster?: string
  controls?: boolean
  hasFullScreen?: boolean
  playsInline?: boolean
  startBtn?: boolean
  muted?: boolean
  autoPlay?: boolean
  loop?: boolean
  playControl?: string
  refInfo?: Ref<VideoRef> | undefined
  onPlay?: () => void
  onEnded?: () => void
  onPause?: () => void
  onError?: (error: any) => void
} & NativeProps

type VideoRef = {
  play?: () => void
  pause?: () => void
}

const defaultProps = {
  controls: false,
  playsInline: false,
  hasFullScreen: false,
  startBtn: false,
  muted: true,
  autoPlay: false,
  loop: false,
  hideMore: true
}

const CustomVideo: FC<VideoProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { poster, controls, className = '' } = props;
  const { state } = useContext(GlobalStoreContext);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const { isFullScreen } = state;

  useEffect(() => {
    const videoWrapper = videoWrapperRef.current;
    if (videoWrapper) {
      if (isFullScreen) {
        startFullScreen(videoWrapper);
      } else {
        if (alreadyFullScreen()) {
          document.exitFullscreen();
        }
      }
    }
  }, [isFullScreen]);
  return (
    <GlobalStoreProvider {...props}>
      <div className={`i-video-wrapper ${className}`} ref={videoWrapperRef}>
        {poster && <Poster poster={poster} />}
        <Player {...props} ref={props.refInfo} />
        <PlayBtn {...props} />
        {controls && <Controls {...props} />}
      </div>
    </GlobalStoreProvider>
  );
};

export default CustomVideo;

