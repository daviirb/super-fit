const PIXEL_ID = document.currentScript?.getAttribute('data-pixel-id') || '';

function initializeFacebookPixel(
  f: Window,
  b: Document,
  e: string,
  v: string,
): void {
  if (f.fbq?.initialized) return;

  type FbqFunction = {
    (...args: any[]): void;
    callMethod?: (...args: any[]) => void;
    push: (...args: any[]) => void;
    loaded: boolean;
    version: string;
    queue: any[];
  };

  const n: FbqFunction = (...args: any[]) => {
    if (n.callMethod) {
      n.callMethod.apply(n, args);
    } else {
      n.queue.push(args);
    }
  };

  if (!f._fbq) f._fbq = n;
  f.fbq = n;
  n.push = (...args: any[]) => n.queue.push(args);
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  f.fbq.initialized = true;

  const t = b.createElement(e) as HTMLScriptElement;
  t.async = true;
  t.src = v;

  const s = b.getElementsByTagName(e)[0];
  s?.parentNode?.insertBefore(t, s);
}

initializeFacebookPixel(
  window,
  document,
  'script',
  'https://connect.facebook.net/en_US/fbevents.js',
);

if (PIXEL_ID) {
  window.fbq('init', PIXEL_ID);
}
