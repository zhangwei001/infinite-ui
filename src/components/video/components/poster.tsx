import * as React from 'react'
import { useContext } from 'react'
import { GlobalStoreContext } from './store'

import './index.less'

interface IInfo {
  poster: string
}

export default function Poster(info: IInfo) {
  const { state } = useContext(GlobalStoreContext)
  const { poster } = info;
  const { showPoster } = state

  if (!showPoster) return null
  return (
    <div className="i-video-poster" style= {{ backgroundImage: `url(${poster})`}}>
    </div>
  )
}