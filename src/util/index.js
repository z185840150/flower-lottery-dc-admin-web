function fullScreen (fullScreen) {
  if (document) {
    if (fullScreen) {
      const requestMethod = document.body.requestFullScreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen || document.body.msRequestFullScreen || document.body.oRequestFullScreen

      if (requestMethod) requestMethod.call(document.body || document)
      else if (typeof window.ActiveXObject !== 'undefined') {
        const wscript = new window.ActiveXObject('WScript.Shell')
        if (wscript !== null) wscript.SendKeys('{F11}')
      }
    } else {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    }
  }
}

function windowSize () {
  return (window && document)
    ? (window.attachEvent && !window.opera)
      ? { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight }
      : { width: window.innerWidth, height: window.innerHeight }
    : { width: 0, height: 0 }
}

module.exports = {
  fullScreen,
  windowSize
}
