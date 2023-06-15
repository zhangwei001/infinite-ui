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
