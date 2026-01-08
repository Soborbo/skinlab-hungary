import { defineMiddleware } from 'astro:middleware';

// Middleware disabled for now - skinlabeurope.com domain logic not yet active
// All requests pass through without redirects

export const onRequest = defineMiddleware((_context, next) => {
  return next();
});
