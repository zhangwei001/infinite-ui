export const REG_WHITE_LIST = /(sg|my|vn|th|ph|id)-test-11\.slatic\.net/i;
export const REG_ICMS_URL = /icms-image\.slatic\.net/i;
export const REG_GCP_URL = /gcp-img\.slatic\.net/i;
export const FILE_BROKER_URL = /filebroker-cdn\.lazada\.(sg|vn|(co\.id)|(co\.th)|(com\.my)|(com\.ph))/i;
// for domain like my-live-03.slatic.net
export const REG_WHITE_LIVE = /(sg|my|vn|th|ph|id)-live(-0\d)?\.slatic\.net/i;
// for domain like laz-img-cdn.alicdn.com ; laz-img-my.alicdn.com
export const REG_WHITE_LAZ = /(laz-img-(sg|my|vn|th|ph|id|cdn))\.alicdn\.com/i;

export const CBU_ALICDN_URL = /cbu(01|02|03|04)\.alicdn\.com/;

// the suffix of img url for rules
export const REG_IMG_SUFFIX =
  /(\.jpg|\.png)_(?:(sum|m|b|\d+x\d+)(xz|xc)?)?(c[xy]\d+i\d+)?(co0)?([qQ]\d+)?(g)?(s\d+)?\.jpg(_.webp)?$/;
// if the img url with this special rule, do nothing.
export const REG_NOT_MODIFY_SUFFIX = /_(?:(sum|m|b|\d+x\d+))?((xz|xc)|g|co0|(c[xy]\d+i\d+))([qQ]\d{2})?(s\d+)?\.jpg/;
export const REG_WEBP_FORMAT = /_\.(webp)/;
export const REG_EXCLUDE_IMG_TYPE = /\.(svg|gif)/;
export const GCP_URL_SUFFIX = /\#(width\=\d+\&)?(height\=\d+)?/i;
export const FILE_BROKER_MODIFY_PATH = /\/kf\//;
export const GW_URL = /\/\/gw\.alicdn\.com/;
// black path do not resize
export const REG_BLACK_PATH = /(\/skyline\/)/i;
