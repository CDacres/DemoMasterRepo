
const phpUnserialize = require('php-unserialize');
const axios = require('axios');

module.exports.Auth = class Auth {
  constructor(req, res, apiUrl) {
    const { ci_session } = req.cookies;
    this.apiUrl = apiUrl;
    this.sessionCookie = ci_session;
  }

  handleSessionCookie() {
    const { session_id, ip_address, user_agent } = phpUnserialize.unserialize(this.sessionCookie);
    const userAgent = user_agent.replace(/\+/g, ' ');
    return {
      session_id,
      ip_address,
      user_agent: userAgent
    };
  }

  hasSessionCookie() {
    return !!this.sessionCookie;
  }

  async getDataApiToken() {
    const sessionData = this.handleSessionCookie();
    const data = {
      api_token: process.env.DATA_API_KEY,
      ...sessionData
    };
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.apiUrl}auth/token_by_session`,
        validateStatus: status => status < 300,
        data
      });
      return response.data.access_token;
    } catch (err) {
      throw new Error(err);
    }
  }
}