import * as React from 'react'
import { createContext, useReducer } from 'react'
import { mergeProps } from '../../../utils/with-default-props'

type IAction =
  | ISetPlay
  | ISetError
  | ISetDuration
  | ISetCurrentTime
  | ISetDrag
  | ISetShowControls
  | ISetMuted
  | ISetIsFullScreen
  | IManuallySetCurrentTime
  | ISetVolume
  | ISetBuffered;

interface ISetPlay {
  type: string
  payload: IStore['isPlay']
}

interface ISetError {
  type: string
  payload: IStore['isError']
}
interface ISetDuration {
  type: string
  payload: IStore['duration']
}
interface ISetCurrentTime {
  type: string
  payload: IStore['currentTime']
}

interface IManuallySetCurrentTime {
  type: string
  payload: IStore['manuallyCurrentTime']
}

interface ISetVolume {
  type: string
  payload: IStore['volume']
}

interface ISetBuffered {
  type: string
  payload: IStore['buffered']
}

interface ISetDrag {
  type: string
  payload: IStore['drag']
}
interface ISetShowPoster {
  type: string
  payload: IStore['showPoster']
}

interface ISetShowControls {
  type: string
  payload: IStore['showControls']
}
interface ISetMuted {
  type: string
  payload: IStore['muted']
}

interface ISetIsFullScreen {
  type: string
  payload: IStore['isFullScreen']
}

interface IStore {
  isPlay: boolean
  isError: boolean
  duration: number
  currentTime: number
  manuallyCurrentTime: number
  volume: number
  buffered: number
  drag: boolean
  showPoster: boolean
  playsInline?: boolean
  showControls: boolean
  muted: boolean
  isFullScreen: boolean
}

interface StoreContext {
  state: Partial<IStore>
  dispatch(param: ISetPlay): void
  dispatch(param: ISetError): void
  dispatch(param: ISetDuration): void
  dispatch(param: ISetCurrentTime): void
  dispatch(param: IManuallySetCurrentTime): void
  dispatch(param: ISetVolume): void
  dispatch(param: ISetBuffered): void
  dispatch(param: ISetDrag): void
  dispatch(param: ISetShowPoster): void
  dispatch(param: ISetShowControls): void
  dispatch(param: ISetMuted): void
  dispatch(param: ISetIsFullScreen): void
}

interface VideoStore {
  src?: string
  poster?: string
  controls?: boolean
  hasFullScreen?: boolean
  playsInline?: boolean
  startBtn?: boolean
  muted?: boolean
  autoPlay?: boolean
  loop?:boolean
  isPlay?:boolean
  isError?: boolean
  showPoster?:boolean
  playControl?: string
  onPlay?: () => void
  onEnded?: () => void
  onPause?: () => void
  onError?: (error: any) => void
  children?: React.ReactNode
}

export function playerReducer(draft: IStore, action: IAction): any {
  const { payload } = action
  switch (action.type) {
    case 'playStatus': {
      return { ...draft, isPlay: payload }
    }
    case 'videoError': {
      return { ...draft, isError: payload }
    }
    case 'isFullScreen': {
      return { ...draft, isFullScreen: payload }
    }
    case 'duration': {
      return { ...draft, duration: payload }
    }
    case 'drag': {
      return { ...draft, drag: payload }
    }
    case 'currentTime': {
      return { ...draft, currentTime: payload }
    }
    case 'manuallyCurrentTime': {
      return { ...draft, manuallyCurrentTime: payload, currentTime: payload }
    }
    case 'volumeChange': {
      const muted = payload === 0 ? true : false;
      return { ...draft, volume: payload, muted }
    }
    case 'setBuffered': {
      return { ...draft, buffered: payload }
    }
    case 'showPoster': {
      return { ...draft, showPoster: payload }
    }
    case 'showControls': {
      return { ...draft, showControls: payload }
    }
    case 'muted': {
      return { ...draft, muted: payload }
    }
    default:
      return draft;
  }
}

const initialState: IStore = {
  isPlay: false,
  isError: false,
  duration: 0,
  currentTime: 0,
  manuallyCurrentTime: 0,
  volume: 0,
  buffered: 0,
  drag: false,
  showPoster: true,
  showControls: true,
  muted: true,
  playsInline: true,
  isFullScreen: false
}

export const GlobalStoreContext = createContext<StoreContext>({
  state: initialState,
  dispatch: () => { },
})

export const GlobalStoreProvider = (props: VideoStore) => {
  const defaultProps = mergeProps({}, props);
  if (props.src && (props.autoPlay || props.playControl == 'play')) {
    defaultProps.isPlay = true
    defaultProps.showPoster = false
  }
  const defaultState = mergeProps(initialState, defaultProps)

  const { children } = props
  const [state, dispatch] = useReducer(playerReducer, defaultState)
  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  )
}
export default { GlobalStoreProvider, GlobalStoreContext }
