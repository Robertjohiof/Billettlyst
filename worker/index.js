// Cloudflare Worker: serves the built React app and proxies Ticketmaster requests,
// so the API key stays on the server instead of in the browser bundle.

const TICKETMASTER_BASE = "https://app.ticketmaster.com/discovery/";
const PROXY_PREFIX = "/api/ticketmaster/";

async function proxyTicketmaster(request, env, url) {
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const path = url.pathname.slice(PROXY_PREFIX.length);
  if (!path.startsWith("v2/")) {
    return new Response("Not found", { status: 404 });
  }

  const target = new URL(TICKETMASTER_BASE + path);
  url.searchParams.forEach((value, key) => {
    if (key.toLowerCase() !== "apikey") target.searchParams.append(key, value);
  });
  target.searchParams.set("apikey", env.TICKETMASTER_API_KEY);

  // Cache responses for 5 minutes to stay well within Ticketmaster's rate limit
  const response = await fetch(target, {
    headers: { accept: "application/json" },
    cf: { cacheTtl: 300, cacheEverything: true },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
      "cache-control": "public, max-age=300",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith(PROXY_PREFIX)) {
      return proxyTicketmaster(request, env, url);
    }
    return env.ASSETS.fetch(request);
  },
};
