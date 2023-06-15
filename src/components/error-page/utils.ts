import { MTOP_ERROR_TEXT, ERROR_TEXT, SITES } from './const';

const ua = navigator.userAgent || '';

export function getPageName() {
  let pathname = document.title || (window.goldlog?.spm_ab || []).join('.');
  try {
    const paths = location.pathname?.split('/');
    const lastPath = paths[paths.length - 1];
    if (lastPath) {
      pathname = lastPath;
    }
  } catch (e) { }
  return pathname;
}

export function getRandomHash() {
  return `${new Date().valueOf()}_${Math.floor(Math.random() * 100000)}`;
}

export function isInLzdApp() {
  return /AliApp\(LA/i.test(ua);
}

export function getErrorDesc(scene: any) {
  if (['mtop', 'MTOP_ERROR'].indexOf(scene) >= 0) {
    return MTOP_ERROR_TEXT;
  }
  return ERROR_TEXT;
}

/**
 * get valid language of this site, because language can be anything
 * @param {string} language
 * @param {string} regionID
 * @return {string} validLanguage
 */
function getValidLanguage(regionID = '', language = '') {
  regionID = regionID.toLocaleUpperCase();
  const validLanguages = SITES[regionID] ? SITES[regionID].lang : [];
  if (!Array.isArray(validLanguages)) {
    return language;
  }

  // if language is switchable, check if it's in this enum array
  let lang = '';
  for (let i = 0; i < validLanguages.length; i++) {
    const item = validLanguages[i];
    if (item && item.indexOf(language) > -1) {
      lang = item;
      break;
    }
  }

  if (!lang) {
    lang = validLanguages[0];
  }

  return lang;
}

/**
 *
 * @param {string} str
 * @param {boolean} decode default true
 * @returns {object} query object
 */
export const getQueryParams = (str = window.location.search, decode = true) => {
  let queryStr = str;
  if (str.includes('?')) {
    [, queryStr = ''] = str.split('?');
  }

  if (queryStr.includes('#')) {
    [queryStr = ''] = queryStr.split('#');
  }

  const queryArr = queryStr.split('&');
  const query: any = {};
  while (queryArr.length) {
    const item: any = queryArr.shift();
    const [k = '', v = ''] = item.split('=');
    if (k) {
      query[k] = decode ? decodeURIComponent(v) : v;
    }
  }

  return query;
};


/**
 * get cookie
 * @param {string} key , the key of cookie , if not set, will return all the cookie
 */


const getCookie = (key: string, options: any = {}) => {
  let result: any = key ? null : {};
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const rdecode = /(%[0-9A-Z]{2})+/g;

  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split('=');
    let cookie = parts.slice(1).join('=');

    if (!options.json && cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1);
    }

    try {
      const name = parts[0].replace(rdecode, decodeURIComponent);
      cookie = cookie.replace(rdecode, decodeURIComponent);

      if (options.json) {
        try {
          cookie = JSON.parse(cookie);
        } catch (e) { }
      }

      if (key === name) {
        result = cookie;
        break;
      }

      if (!key) {
        result[name] = cookie;
      }
    } catch (e) { }
  }

  return result;
};


/**
 * split hng cookie and get language string and regionID
 * @param {string} hngcookie string link "MY|en-MY|MYR|458"
 */
function splitHngCookie(str: string) {
  return str ? str.split('|') : [];
}

/**
 * Get regionID and language in browser and web view
 * priority:
 * in web container: [_i18n_] > [g_config] > [domain] > [cookie]
 * if can't get the correct regionID， return SG en
 */
export function getEnv(short = true, cookieFirst = false) {
  let regionID = '';
  let language = '';
  const hngCookie = splitHngCookie(getCookie('hng'));

  // try to get from _i18n_ inject by app
  if (typeof window === 'object' && window._i18n_) {
    let i18n = window._i18n_;
    if (typeof i18n === 'string') {
      try {
        i18n = JSON.parse(i18n);
      } catch (e) { }
    }
    if (typeof i18n === 'object') {
      regionID = i18n.regionID;
      language = i18n.language;
    }
  }
  if (!regionID && window.g_config && typeof window.g_config === 'object') {
    regionID = window.g_config.regionID;
    language = window.g_config.language;
  }
  // try to get regionID from domain and get language from cookie
  if (!regionID && typeof location === 'object' && location.hostname) {
    for (const k in SITES) {
      const site = SITES[k];
      if (site && site.domain && location.hostname.indexOf(site.domain) > -1) {
        regionID = site.regionID;
        break;
      }
    }
    if (hngCookie.length > 1) {
      language = hngCookie[1];
    }
  }
  // try to get from the cookie
  if (!regionID) {
    if (hngCookie.length >= 4) {
      regionID = hngCookie[0];
      language = hngCookie[1];
    }
  }

  // cookie first
  if (cookieFirst && hngCookie.length > 1) {
    language = hngCookie[1];
  }
  const urlParams = getQueryParams();

  regionID = urlParams['wh_regionID'] || regionID || 'SG';
  language = getValidLanguage(regionID, language) || 'en';
  if (short) {
    language = language.substring(0, 2);
  }
  return {
    regionID: regionID.toLocaleUpperCase(),
    language
  };
}