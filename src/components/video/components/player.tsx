import React, { useContext, useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react"
import classNames from "classnames"
import { useThrottleEffect } from "ahooks"
import { GlobalStoreContext } from './store'
import Loading from "../../loading"

const classPrefix = 'i-video'

interface IInfo {
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
  hideMore?: boolean
  onPlay?: () => void
  onEnded?: () => void
  onPause?: () => void
  onError?: (error: any) => void
}

type VideoRef = {
  play?: () => void
  pause?: () => void
}
interface IParams {
  type: string
  payload: boolean
}

interface IInitParams {
  type: string
  payload: number
}

type IDispatch = (params: IParams) => void
type IInitDispatch = (params: IInitParams) => void

const mouseMoveShowControl = (dispatch: IDispatch) => {
  requestAnimationFrame(() => {
    dispatch({
      type: 'showControls',
      payload: true
    })
  })
}

const initVideoParams = (e: any, dispatch: IInitDispatch) => {
  dispatch({ type: 'duration', payload: e.currentTarget.duration })
}

// 在低阶组件内通过forwardRef 显式传递ref 人为打破限制
const Player = forwardRef<VideoRef, IInfo>((info: IInfo, ref) => {
  const [loading, setLoading] = useState(false)
  const { src, loop, playControl, hideMore, onPlay, onEnded, onPause, onError, muted: mutedFromProps } = info
  const refEl = useRef<HTMLVideoElement>(null)
  const { state, dispatch } = useContext(GlobalStoreContext)
  const { isPlay, isError, manuallyCurrentTime, muted, playsInline, volume } = state

  const disablePictureInPicture = hideMore;
  const controlsList = hideMore ? "nodownload noremoteplayback noplaybackrate" : "";

  // 限制可以使用的方法，避免ref 失控
  useImperativeHandle(ref, () => ({
    play: () => {
      dispatch({ type: 'playStatus', payload: true })
      onPlay && onPlay();
    },
    pause: () => {
      dispatch({ type: 'playStatus', payload: false })
      onPause && onPause();
    },
  }))

  // Handle for setting a volume when video is not muted through a prop
  useEffect(() => {
    const video = refEl.current
    if (video) {
      if (volume !== undefined && !muted) {
        dispatch({
          type: 'volumeChange',
          payload: 0.5
        });
      }
    }
  }, [mutedFromProps])

  // Handle manual control from outer source
  useEffect(() => {
    const video: any = refEl.current;
    if (playControl) {
      if (playControl === 'play') {
        // Should return a Promise https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
        const playPromise = video?.play()
        if (playPromise) {
          playPromise.catch((error: any) => {
            onError && onError(error);
          })
        }
      } else {
        video?.pause();
      }
    }
  }, [playControl])

  // Handle exit fullscreen event
  useEffect(() => {
    document.addEventListener('fullscreenchange', (event) => {
      if (!document.fullscreenElement) {
        dispatch({
          type: 'isFullScreen',
          payload: false
        });
      }
    });
  }, []);

  useEffect(() => {
    const video = refEl.current
    if (video) {
      if (isPlay) {
        const playPromis = video?.play()
        if (playPromis) {
          playPromis.catch((error: any) => {
            onError && onError(error);
          })
        }
      } else {
        //播放状态下
        video.pause()
      }
    }
  }, [isPlay])

  // Update volume when volume is manually changed
  useThrottleEffect(
    () => {
      const video = refEl.current
      if (video) {
        if (volume !== undefined) {
          video.volume = volume
        }
      }
    },
    [volume],
    {
      wait: 100,
    },
  );

  // Update current time when progress is manually changed
  useThrottleEffect(
    () => {
      const video = refEl.current
      if (video) {
        if (manuallyCurrentTime) {
          video.currentTime = manuallyCurrentTime
        }
      }
    },
    [manuallyCurrentTime],
    {
      wait: 100,
    },
  );


  const runPlay = () => {
    dispatch({ type: 'playStatus', payload: true })
    onPlay && onPlay();
  }
  const runPause = () => {
    dispatch({ type: 'playStatus', payload: false })
    onPause && onPause();
  }
  const runEnded = () => {
    dispatch({ type: 'playStatus', payload: false })
    onEnded && onEnded();
  }

  const handleProgress = () => {
    if (refEl.current === null) {
      return;
    }
    refEl.current.addEventListener('progress', () => {
      if (refEl.current === null) {
        return;
      }
      const bufferedEnd = refEl.current.buffered.end(refEl.current.buffered.length - 1);
      const duration = refEl.current.duration;
      if (duration > 0) {
        dispatch({
          type: 'setBuffered',
          payload: (bufferedEnd / duration) * 100,
        })
      }
    });
  };

  const handleError = (e: any) => {
    dispatch({
      type: 'videoError',
      payload: true,
    });
    dispatch({
      type: 'isPlay',
      payload: false,
    });
    dispatch({
      type: 'showPoster',
      payload: true,
    });
    dispatch({
      type: 'showControls',
      payload: false,
    });
    onError && onError(e);
  };
  return (
    <div>
      <video
        ref={refEl}
        src={src}
        controls={false}
        controlsList={controlsList}
        playsInline={playsInline}
        disableRemotePlayback={true}
        disablePictureInPicture={disablePictureInPicture}
        autoPlay={isPlay}
        loop={loop}
        muted={muted}
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portrait"
        className={classNames(classPrefix)}
        onTouchStart={() => dispatch({ type: 'showControls', payload: true })}
        onTouchMove={() => mouseMoveShowControl(dispatch)}
        onLoadedMetadata={(e) => initVideoParams(e, dispatch)}
        onPause={runPause}
        onPlay={runPlay}
        onTimeUpdate={(e) => dispatch({ type: 'currentTime', payload: e.currentTarget.currentTime })}
        onEnded={runEnded}
        onError={onError}
        onProgress={handleProgress}
      />
      {loading && isPlay && !isError && (
        <div className="video-loading">
          <Loading.Element
            wrapperClassName="loading-container"
            mask={false}
            visible={loading && isPlay}
          />
        </div>
      )}

      {isError && (
        <div className="video-error">
          <p>
            Error loading video<br />Please exit and reload page
          </p>
        </div>
      )}
    </div>
  )
})
export default Player;