declare global {
  interface Window {
    fbq: ((...args: any[]) => void) & { initialized?: boolean };
    _fbq?: any;
  }
}
type EventName =
  | 'ViewContent'
  | 'AddPaymentInfo'
  | 'CompleteRegistration'
  | 'AddToCart'
  | 'Purchase'
  | 'Subscribe';

export const FB_PIXEL_ID: string | undefined =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = (): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const event = (
  name: EventName,
  options: Record<string, any> = {},
): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};
