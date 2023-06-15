declare global {
    interface Document {
      mozCancelFullScreen?: () => Promise<void>
      oCancelFullScreen?: () => Promise<void>
      msExitFullscreen?: () => Promise<void>
      webkitExitFullscreen?: () => Promise<void>
      mozFullScreenElement?: Element
      oRequestFullscreen?: Element
      mozFullScreenEnabled?: Element
      mozFullScreen?: Element
      webkitIsFullScreen?: Element
      msFullscreenEnabled?:Element
      webkitFullscreenEnabled?: Element
      webkitSupportsFullscreen?: Element
      msFullscreenElement?: Element
      webkitFullscreenElement?: Element
    }
  
    interface HTMLElement {
    webkitRequestFullScreen?: Element
      msRequestFullscreen?: () => Promise<void>
      oCancelFullScreen?: () => Promise<void>
      mozRequestFullscreen?: () => Promise<void>
      webkitRequestFullscreen?: () => Promise<void>
    }
}
export function supportFullScreen() {

    const fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen)
    return fullScreenEnabled
}

// 判断浏览器是否已经在全屏模式
export function alreadyFullScreen() {
    return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)
}

export function startFullScreen(elem: any) {
    if (!elem) return
    if (elem.requestFullscreen) {
        elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen()
    } else if (elem.webkitSupportsFullscreen) {
        elem.webkitEnterFullscreen()
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
    }
}

export function exitFullScreen() {
    if (!alreadyFullScreen) return
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    // } else if (document.oRequestFullscreen) {
    //     document.oCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}