import cssVars from 'css-vars-ponyfill';
import storage from '../utils/storage';

export const THEME = {
  Default: {
    '--font-high-emphasis': 'rgba(1, 8, 30, 1)',
    '--font-primary': 'rgba(36, 174, 143, 1)',
  },
  Arise: {
    '--font-high-emphasis': 'rgba(255, 255, 255, 1)',
    '--font-primary': 'rgba(237, 110, 114, 1)',
  },
};

export const setTheme = themeKey => {
  const themeKeys = Object.keys(THEME);
  let KEY = null;
  if (themeKeys.includes(themeKey)) {
    KEY = themeKey;
  } else {
    KEY = storage.getItem('theme') || 'default';
  }
  storage.setItem('theme', KEY);
  if (!document.getElementById('preview-device')) {
    return
  };
  const doc = document.getElementById('preview-device').contentWindow.document

  let styleLink = doc.getElementById('theme-style');
  let hrefSrc = '//dev.g.alicdn.com/infinite-ui/infinite-ui/4.0.6/theme/default.css';
  if (KEY === 'Default') {
    hrefSrc = '//dev.g.alicdn.com/infinite-ui/infinite-ui/4.0.6/theme/default.css';
  } else if (KEY === 'Arise') {
    hrefSrc = '//dev.g.alicdn.com/infinite-ui/infinite-ui/4.0.6/theme/arise.css';
  }

  if (styleLink) {
    styleLink.href = hrefSrc;
  } else {
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    styleLink.href = hrefSrc;
    if (document.getElementById('preview-device')) {
      const doc = document.getElementById('preview-device').contentWindow.document
      doc && doc.body && doc.body.append(styleLink);
    };
  }
  cssVars({
    onlyLegacy: false,
    variables: THEME[KEY],
    onError() {
      cssVars({
        onlyLegacy: false,
        variables: THEME[KEY],
      });
    },
  });
};