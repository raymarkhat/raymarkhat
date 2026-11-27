// Cloudflare Worker: static assets + canonical host redirect.
//
// The site is served from ./dist through the ASSETS binding (see wrangler.toml).
// Every hostname other than the canonical apex (www, the workers.dev preview URL,
// anything else) is permanently redirected to the apex, so only one hostname is
// ever indexed.

const CANONICAL_HOST = 'raymarkhat.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname !== CANONICAL_HOST) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
