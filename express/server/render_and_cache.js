const { Auth } = require('./helpers/authHelper');
const getDomainInfo = require('../config/get-domain-info');
const { getApiUrl } = require('../config/api');
const availableCctlds = ['de', 'fr', 'ie', 'uk', 'us'];
const { parse } = require('url');

// const LRUCache = require('lru-cache');
module.exports = app => {
  // This is where we cache our rendered HTML pages
  // const ssrCache = new LRUCache({
  //   max: 100,
  //   maxAge: 1000 * 60 * 60 // 1 hour
  // });

  // Build domain-specific pathname key
  // function getCacheKeyUrl(queryParams) {
  //   const { domain, pathname } = queryParams;
  //   return `${domain}_${pathname}`;
  // }

  async function renderAndCache(req, res, pagePath, queryParams) {
    const { query } = parse(req.url, true);
    // const key = getCacheKeyUrl(queryParams);

    // If not in development and we have a page in the cache, let's serve it
    // if (!queryParams.dev && ssrCache.has(key)) {
    //   res.setHeader('x-from-cache', true);
    //   res.send(ssrCache.get(key));
    //   return;
    // }

    // If not...
    try {
      // Let's render the page into HTML
      //const html = await app.renderToHTML(req, res, pagePath, queryParams);

      // Something is wrong with the request, let's skip the cache
      // if (res.statusCode !== 200) {
      //   res.send(html);
      //   return;
      // }

      // Set the cache if not in development
      // if (!queryParams.dev) {
      //   // Let's cache this page and the domain
      //   ssrCache.set(key, html);

      //   res.setHeader('x-from-cache', false);
      // }

      //res.send(html);

      //app.send(req, res, pagePath, queryParams);
      const apiUrl = getApiUrl();
      const auth = new Auth(req, res, apiUrl);
      if (auth.hasSessionCookie()) {
        queryParams.dataApiToken = await auth.getDataApiToken();
      }
      const potentialDomain = req.baseUrl.replace(/^\/+/g, '');
      if (availableCctlds.indexOf(potentialDomain) > -1) {
        queryParams.domain = potentialDomain;
      } else {
        queryParams.domain = 'uk';
      }
      queryParams.apiUrl = apiUrl;
      const domainInfo = getDomainInfo(queryParams.domain);
      app.render(req, res, pagePath, { ...queryParams, ...domainInfo })
    } catch (err) {
      app.renderError(err, req, res, pagePath, query);
    }
  }

  return renderAndCache;
};
