// Available quality: 90, 80, 75, 60, 50
// const AVAILABLE_QUALITY = [90, 80, 75, 60, 50];
// http://gitlab.alibaba-inc.com/lzdmod/crossimage/blob/master/code/utils/quality.js
// todo: mozConnection是实验功能，可以考虑测速度网址
const NETWORK_QUALITY: { [key: string]: number } = {
    '2g': 50,
    '3g': 75,
    '4g': 80,
    wifi: 90,
  };
  
  function getQualityByNetwork() {
    if (typeof navigator !== 'undefined') {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      // wifi 下返回的也是4g
      if (connection && connection.effectiveType) {
        const connectionType = connection.effectiveType;
        return NETWORK_QUALITY[connectionType] || 90;
      }
    }
    return 90;
  }
  
  function getQualityByDevicePixelRatio(ratio: number) {
    let quality = 90;
    if (ratio >= 3) {
      quality = 50;
    } else if (ratio >= 2) {
      quality = 75;
    }
    return quality;
  }
  
  /**
   *  Get the compression quality
   * @param {string} devicePixelRatio
   */
  export default function getQuality(devicePixelRatio: number) {
    const qualityNumber = Math.min(getQualityByNetwork(), getQualityByDevicePixelRatio(devicePixelRatio));
    return `q${qualityNumber}`;
  }
  