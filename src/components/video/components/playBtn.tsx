import * as React from 'react'
import { useContext, useEffect } from 'react'
import { IconPlay } from '@ali/super-icon'
import { GlobalStoreContext } from './store'
import './index.less'

interface IParams {
  type: string,
  payload: boolean
}
interface IInfo {
  src?: string
  poster?: string
  controls?: boolean
  hasFullScreen?: boolean
  playsInline?: boolean
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

const changePlay = (dispatch: IDispatch, isPlay: boolean|undefined) => {
  if (isPlay) {
    dispatch({
      type: 'playStatus',
      payload: false
    })
    dispatch({
      type: 'showPoster',
      payload: false
    })
  } else {
    dispatch({
      type: 'playStatus',
      payload: true
    })
    dispatch({
      type: 'showPoster',
      payload: false
    })
  }
}


export default function PlayBtn(info: IInfo) {
  const { playControl } = info;
  const { state, dispatch } = useContext(GlobalStoreContext)
  const { isPlay } = state
  
  useEffect(() => {
    if (playControl === 'play') {
      changePlay(dispatch, false)
    }
    if (playControl === 'pause') {
      changePlay(dispatch, true)
    }
  }, [playControl])

  return (
    <div className="play-btn-mask" onClick={() => changePlay(dispatch, isPlay)}>
      {isPlay ? <div/> : <div className="play-btn-wrapper">
        <IconPlay size={24} color="#ffffff" />
      </div>}
    </div>
    
  )
}