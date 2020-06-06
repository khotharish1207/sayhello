function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function trackEvent(...params) {
  if (window.analytics) {
    window.analytics.track(...params);
  }
}


function identify(...params) {
    if (window.analytics) {
      window.analytics.identify(...params);
    }
  }

export { detectMob, trackEvent, identify };
