import * as React from 'react'
import { useContext, useRef, useEffect } from 'react'
import isNumber from 'lodash/isNumber'
import { GlobalStoreContext } from './store'
import './index.less'

export default function Bar() {
  const progressBarRef = useRef<HTMLProgressElement>(null)
  const seekRef = useRef<HTMLInputElement>(null)
  const { state, dispatch } = useContext(GlobalStoreContext);
  const { duration, currentTime, buffered } = state

  useEffect(() => {
    if (!duration) {
      return;
    }
    seekRef.current && seekRef.current.setAttribute('max', duration.toString());
    progressBarRef.current && progressBarRef.current.setAttribute('max', duration.toString());
  }, [duration]);

  const handleProgressChange = (e: any) => {
    const skipTo = e?.target?.value;
    if (!skipTo) {
      return;
    }
    dispatch({
      type: 'manuallyCurrentTime',
      payload: Number(skipTo),
    });
    dispatch({
      type: 'showPoster',
      payload: false,
    });
  }

  return (
    <div className="video-progress">
      <div style={{ width: `100%`, height: 4, backgroundColor: '#b7b5b2', position: 'absolute', borderRadius: 6 }} />
      <div style={{ width: `${buffered}%`, height: 4, backgroundColor: '#b7b5b2', position: 'absolute', borderRadius: 6 }} />
      <div style={{ width: `${(isNumber(duration) && isNumber(currentTime)) ? (currentTime / duration) * 100 : 0}%`, height: 4, backgroundColor: '#fff', position: 'absolute', borderRadius: 6 }} />
      <input
        ref={seekRef}
        className="seek"
        value={currentTime}
        min="0"
        step="any"
        type="range"
        onChange={handleProgressChange}
      />
    </div>
  );
}
