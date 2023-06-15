import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useUpdateEffect } from 'ahooks'
import { Toast, ToastProps } from './toast'

const toastArray: (() => void)[] = []

export type ToastShowProps = Omit<ToastProps, 'visible'>

export function show(p: ToastShowProps | string) {
  const props = typeof p === 'string' ? { content: p } : p
  let timer = 0
  const container = document.createElement('div')
  document.body.appendChild(container)

  const TempToast = () => {
    const [visible, setVisible] = useState(true)
    const [state, setState] = useState({ duration: 3000, ...props })

    const _afterClose = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(container)
      if (unmountResult && container.parentNode) {
        container.parentNode.removeChild(container)
      }
    }

    const destroy = useCallback(() => {
      setVisible(false)
    }, [])

    useEffect(() => {
      _clear()
      toastArray.push(_afterClose)
    }, [])

    useEffect(() => {
      if (state.duration !== 0 && 'duration' in state) {
        timer = window.setTimeout(destroy, state.duration)
      }
      return () => {
        if (timer !== 0) {
          window.clearTimeout(timer)
        }
      }
    }, [])

    useUpdateEffect(() => {
      if ('duration' in state) {
        window.clearTimeout(timer)
        timer = window.setTimeout(destroy, state.duration)
      }
    }, [state.duration])

    return (
      <Toast
        {...state}
        visible={visible}
      />
    )
  }
  ReactDOM.render(<TempToast />, container)
}

function _clear() {
  let fn = toastArray.pop()
  while (fn) {
    fn()
    fn = toastArray.pop()
  }
}

export function clear() {
  setTimeout(_clear)
}
