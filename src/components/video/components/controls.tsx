import * as React from 'react'
import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from './store'
import { IconPlay, IconPause, IconSmallscreen, IconFullscreen, IconSound, IconMute } from '@ali/super-icon'
import Bar from './bar'
import Time, { timeTransform } from './time'

interface IParams {
  type: string,
  payload: boolean | number
}

interface IInfo {
  src?: string
  poster?: string
  controls?: boolean
  hasFullScreen?: boolean
  playsInline?: boolean
  startBtn?: boolean
  muted?: boolean
  autoPlay?: boolean
  loop?:boolean
  playControl?: string
  hideMore?:boolean
  onPlay?: () => void
  onEnded?: () => void
  onPause?: () => void
  onError?: (error: any) => void
}


type IDispatch = (params: IParams) => void

let showControlsFlag = true
const playBtnClick = (isPlay: boolean | undefined, dispatch: IDispatch) => {
  if (isPlay !== undefined) {
    dispatch({
      type: 'playStatus',
      payload: !isPlay
    })
    dispatch({
      type: 'showPoster',
      payload: false
    })
  }
}

const mouseMoveShowControl = (dispatch: IDispatch) => {
  requestAnimationFrame(() => {
    dispatch({
      type: 'showControls',
      payload: true
    })
  })
}

const setMuted = (muted: boolean | undefined, dispatch: IDispatch) => {
  dispatch({
    type: 'muted',
    payload: !muted
  })
}

const setFullScreen = (isFullScreen: boolean | undefined, dispatch: IDispatch) => {
  dispatch({
    type: 'isFullScreen',
    payload: !isFullScreen
  })
}


export default function Controls(info: IInfo) {
  const { state, dispatch } = useContext(GlobalStoreContext)
  const { isPlay, isError, showControls, muted, isFullScreen, duration, volume } = state

  useEffect(() => {
    if (showControlsFlag) {
      if (isPlay) {
        showControlsFlag = false
        setTimeout(() => {
          showControlsFlag = true
          dispatch({
            type: 'showControls',
            payload: false
          })
        }, 3500)
      }
    }
  }, [showControls, isPlay])
  
  if (isError) {
    return null;
  }

  return (
    <div className="controls-wrapper"
        style={{ opacity: `${showControls || !isPlay ? '1' : '0'}` }}
      onMouseMove={() => mouseMoveShowControl(dispatch)}
      onTouchMove={() => mouseMoveShowControl(dispatch)}
    >
      <div className="bottom-wrapper">
        <div className="bottom-content-left">
          <div className="controls-btn-wrapper" onClick={() => playBtnClick(isPlay, dispatch)}>
              {isPlay ? <IconPause size={16} color='#fff' /> : <IconPlay size={16} color='#fff' />}
          </div>
          {/* Duration time */}
          <div className="time-wrapper">
            <Time /> <span className="time-seprator">/</span> <span>{(duration && timeTransform(duration)) || "00:00"}</span>
          </div>
        </div>
        <div className="bottom-content-right">
          <div className="volume-btn-wrapper" onClick={() => setMuted(muted, dispatch)}>
            {muted ? <IconMute size={16} color='#fff' /> : <IconSound size={16} color='#fff' />}
          </div>
          <div className="fullscreen-wrapper" onClick={() => setFullScreen(isFullScreen, dispatch)}>
            {isFullScreen ? <IconSmallscreen size={16} color='#fff' /> : <IconFullscreen size={16} color='#fff' />}
          </div>
        </div>
      </div>
      <Bar />
      
    </div>
  )
}