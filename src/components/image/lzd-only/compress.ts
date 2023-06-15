import sizeList from './size';
import getQuality from './quality';
import { isSupportWebp } from './webp-support'
import { config } from './types';
import {
    REG_ICMS_URL,
    REG_WHITE_LIST,
    REG_WHITE_LIVE,
    REG_WHITE_LAZ,
    REG_EXCLUDE_IMG_TYPE,
    REG_GCP_URL,
    FILE_BROKER_URL,
    FILE_BROKER_MODIFY_PATH,
    GW_URL,
    REG_BLACK_PATH,
    CBU_ALICDN_URL,
    REG_IMG_SUFFIX
} from './regex';
  
const validHost = (originUrl:string) => {
    // some path do not support resize
    if (REG_BLACK_PATH.test(originUrl)) return false;;
    // if already has resize params
    if (REG_EXCLUDE_IMG_TYPE.test(originUrl)) return false;

    if(REG_IMG_SUFFIX.test(originUrl)) return false;
    return (
        REG_WHITE_LIST.test(originUrl) ||
        REG_WHITE_LIVE.test(originUrl) ||
        REG_WHITE_LAZ.test(originUrl) ||
        REG_ICMS_URL.test(originUrl) ||
        REG_GCP_URL.test(originUrl) ||
        FILE_BROKER_URL.test(originUrl) ||
        GW_URL.test(originUrl) ||
        CBU_ALICDN_URL.test(originUrl)
    );
}

const formatUrl = (originUrl:string) => {
    originUrl = originUrl.replace('//gw.alicdn.com', '//laz-img-cdn.alicdn.com');
    if (FILE_BROKER_URL.test(originUrl) && FILE_BROKER_MODIFY_PATH.test(originUrl)) {
        const targetUrl = 'filebroker-s.slatic.net';
        originUrl = originUrl.replace(FILE_BROKER_URL, targetUrl).replace(FILE_BROKER_MODIFY_PATH, '/');
    } else if (REG_WHITE_LIVE.test(originUrl) || REG_WHITE_LIST.test(originUrl)) {
        // the url to live-05
        originUrl = originUrl.replace(/live(-0\d)?/, 'live-05').replace(/test-11/, 'live-05');
    }
    return originUrl;
}

/**
 * get the best size of image
 * @param {number} width: expected width,
 * @param  {number} height: expected height
 */
function getBestCdnSize(width: number, height: number = 0) {
    let targetWidth = 0;
    const displayWidth = width || screen.width || 0;
    const displayHeight = height;
  
    if (!displayWidth && !displayHeight) {
      return '';
    }
  
    targetWidth = Math.max(displayWidth, displayHeight);
    targetWidth *= devicePixelRatio;
  
    let bestSize = sizeList.find((size) => Math.min(size[0], size[1] || size[0]) >= targetWidth);
  
    if (!bestSize) {
      bestSize = sizeList[sizeList.length - 1];
    }
  
    const bestSizeString = bestSize ? `${bestSize[0]}x${bestSize[1] || bestSize[0]}` : '';
    return bestSizeString;
}

const composeUrl = (url: string, params: config) =>{
    let jpgStr = '';
    let formatStr = '';

    if (params.size) {
        jpgStr += params.size;
    }
    if (params.quality) {
        jpgStr += params.quality;
    }
    if (jpgStr) {
        jpgStr = `_${jpgStr}.jpg`;
    }
    if (params.format && params.format === 'webp') {
        formatStr = `_.${params.format}`;
    }
    return url + jpgStr + formatStr;
}

const getFitUrl = (url:string, urlConfig: config) => {
    // global config , use for setting all the function  calling
    const globalConfig = (typeof window === 'object' && window.crossimageConfig) || {};
    urlConfig = Object.assign({}, globalConfig, urlConfig);
    const params = Object.assign(
        {},
        {
            clean: true,
        },
        urlConfig
    );
    params.size = getBestCdnSize(urlConfig.width, urlConfig.height);
    params.quality = urlConfig.quality ? urlConfig.quality : getQuality(devicePixelRatio);
    if (isSupportWebp()) {
        params.format = 'webp';
    }
    return composeUrl(url, params)
}

export function compressImg(url: string, urlConfig: object) {
    const urlArr = url.split('?');
    let originUrl = urlArr[0];
    const originQuery = urlArr[1] || '';
    
    if(!validHost(originUrl)) {
        return url;
    }
    originUrl = formatUrl(originUrl);
    let resultUrl = getFitUrl(originUrl, urlConfig);
    resultUrl =  `${resultUrl}${originQuery ? '?' + originQuery : ''}`
    return resultUrl;
}

