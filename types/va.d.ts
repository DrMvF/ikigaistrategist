export {};

declare global {
  interface Window {
    va: (event: 'event' | 'pageview' | 'beforeSend', properties?: Record<string, unknown>) => void;
  }
}
