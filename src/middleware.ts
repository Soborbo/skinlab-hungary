import { defineMiddleware } from 'astro:middleware';

const HUNGARIAN_DOMAIN = 'skinlabhungary.hu';
const EUROPE_DOMAIN = 'skinlabeurope.com';

// Supported languages (excluding Hungarian which is on separate domain)
const SUPPORTED_LANGS = ['en', 'sk', 'de', 'ro', 'cs', 'hr', 'sl', 'sr'];

export const onRequest = defineMiddleware(({ request, redirect }, next) => {
  const url = new URL(request.url);
  const host = url.hostname;
  const pathname = url.pathname;

  // Skip for assets, API routes, and internal Astro routes
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/api/') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|eot)$/)
  ) {
    return next();
  }

  // Skip redirects on localhost for development
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return next();
  }

  // Check if path starts with a language code
  const pathLang = SUPPORTED_LANGS.find(lang =>
    pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  // skinlabeurope.com domain logic
  if (host.includes(EUROPE_DOMAIN)) {
    // Root path → redirect to English
    if (pathname === '/') {
      return redirect('/en/', 302);
    }

    // If trying to access Hungarian content (no lang prefix), redirect to skinlabhungary.hu
    if (!pathLang) {
      return redirect(`https://${HUNGARIAN_DOMAIN}${pathname}`, 301);
    }
  }

  // skinlabhungary.hu domain logic
  if (host.includes(HUNGARIAN_DOMAIN)) {
    // If trying to access foreign language content, redirect to skinlabeurope.com
    if (pathLang) {
      return redirect(`https://${EUROPE_DOMAIN}${pathname}`, 301);
    }
  }

  return next();
});
