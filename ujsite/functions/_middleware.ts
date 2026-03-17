interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const host = url.hostname;
  const path = url.pathname;
  const langPrefixes = ["/de", "/sk", "/fr", "/it", "/es", "/pl", "/cs", "/ro"];

  // skinlab.hu: csak magyar tartalom, nyelvi prefixet redirect-elj skinlabeurope.com-ra
  if (host === "skinlab.hu" || host === "www.skinlab.hu") {
    const hasLangPrefix = langPrefixes.some(p => path.startsWith(p + "/") || path === p);
    const hasEnPrefix = path.startsWith("/en/") || path === "/en";
    if (hasLangPrefix || hasEnPrefix) {
      return Response.redirect(`https://skinlabeurope.com${path}`, 301);
    }
  }

  // skinlabeurope.com: prefix nélküli kérés → angol (belső rewrite /en/-re)
  if (host === "skinlabeurope.com" || host === "www.skinlabeurope.com") {
    const hasLangPrefix = langPrefixes.some(p => path.startsWith(p + "/") || path === p);
    if (!hasLangPrefix) {
      const rewrittenPath = path === "/" ? "/en/" : `/en${path}`;
      const newUrl = new URL(rewrittenPath, url.origin);
      newUrl.search = url.search;
      return context.env.ASSETS.fetch(new Request(newUrl.toString(), context.request));
    }
  }

  return context.next();
};
