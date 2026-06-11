// Feature flags.
//
// BLOG_ENABLED — the blog is drafted/hidden until it has real content and
// cover images. While false:
//   - the `blog` content collection loads empty, so no /blog/[slug] post pages
//     are built and blog posts are excluded from site search automatically;
//   - the /blog index returns a 404 (see src/pages/blog/index.astro);
//   - the footer "Blog" link is hidden (see src/components/layout/Footer.astro).
// Nothing thin is exposed to users, Google or the sitemap. Training is
// unaffected. Flip to `true` (and add the cover images) to re-publish.
export const BLOG_ENABLED = false;
