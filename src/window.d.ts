// Global Window augmentations.
export {};

declare global {
  interface Window {
    /**
     * Debug flag set once by the inline script in BaseLayout.astro.
     * Gates client-side error-code (`[CODE]`) console logging so it only
     * appears for developers / opted-in users (localhost, `?debug=1`, or
     * localStorage `sl-debug` = `'1'`) — never for normal visitors.
     */
    __slDebug?: boolean;
  }
}
