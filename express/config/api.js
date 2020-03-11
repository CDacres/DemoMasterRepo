
const https = require('https');

if (process.env.NODE_ENV !== 'production' && typeof https.globalAgent.options !== 'undefined') {
  https.globalAgent.options.rejectUnauthorized = false;
}

module.exports = {
  getApiUrl: () => `https://api.${process.env.SITE_NAME}/`
};
