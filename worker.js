// Cloudflare Worker: static assets + canonical host redirect.
//
// The site is served from ./dist via the ASSETS binding (see wrangler.toml).
// Requests to the apex domain are permanently redirected to www so that only one
// hostname is ever indexed.

const CANONICAL_HOST = 'www.raymarkhat.com';
const APEX_HOSTS = new Set(['raymarkhat.com']);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (APEX_HOSTS.has(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
