import * as React from 'react'
import { useContext } from 'react'
import { GlobalStoreContext } from './store'

export const timeTransform = (time: number) => {
  time = parseInt(time + '', 10)
  if (time === 0) {
    return '00:00'
  }
  const minute = parseInt(time / 60 + '', 10)
  const second = time % 60
  const hour = parseInt(time / 3600 + '', 10)
  return hour > 0 ?
    `${hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}` :
    `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
}

export default function Time() {
  const { state } = useContext(GlobalStoreContext)
  const { currentTime } = state
  return (
    <div className="time-wrapper-content">
      {currentTime && timeTransform(currentTime) || '00:00'}
    </div>
  )
}
