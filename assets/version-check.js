(() => {
  const currentVersion = document.documentElement.dataset.siteVersion || '';
  const scriptUrl = document.currentScript?.src;

  if (!scriptUrl || !currentVersion || currentVersion === '__SITE_VERSION__') return;

  const siteRoot = new URL('../', scriptUrl);
  const versionUrl = new URL('version.json', siteRoot);
  let checking = false;

  const checkForUpdate = async () => {
    if (checking) return;
    checking = true;
    versionUrl.searchParams.set('t', Date.now().toString());

    try {
      const response = await fetch(versionUrl, { cache: 'no-store' });
      if (!response.ok) return;

      const { version } = await response.json();
      if (!version || version === currentVersion) return;

      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set('site-version', version.slice(0, 12));
      window.location.replace(nextUrl);
    } catch {
      // 版本检查失败不影响页面正常浏览，下次打开或切回页面时会重试。
    } finally {
      checking = false;
    }
  };

  checkForUpdate();
  window.addEventListener('pageshow', checkForUpdate);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForUpdate();
  });
})();
