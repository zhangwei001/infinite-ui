let supportWebp = false;

function checkSupport() {
    supportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    if (supportWebp) {
        try {
            window.localStorage && window.localStorage.setItem('supportWebp', '1');
        } catch (e) {
            console.log(e);
        }
    }
}


function supportDetect() {
 if (window.localStorage && window.localStorage.getItem('supportWebp')) {
    supportWebp = window.localStorage.getItem('supportWebp') === '1';
  } else {
    checkSupport();
  }
}

supportDetect();

export const isSupportWebp = () => supportWebp;
