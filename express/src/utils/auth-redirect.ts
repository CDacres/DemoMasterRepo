import Router from 'next/router';
import isMobile from 'ismobilejs';
import { ServerResponse } from 'http';

type DefaultArgs = {
  adminRedirectUrl?: string;
  mobileRedirectUrl?: string;
  redirectUrl?: string;
};
type Args = DefaultArgs & {
  domain: string;
  isAdmin: boolean;
  isLoggedIn?: boolean;
  isSpoofMode: boolean;
};

class AuthRedirect {
  protected defaults: DefaultArgs = {
    adminRedirectUrl: null,
    mobileRedirectUrl: null,
    redirectUrl: null,
  };
  protected adminRedirectUrl: string;
  protected domain: string;
  protected isMobile: boolean;
  protected isAdmin: boolean;
  protected isSpoofMode: boolean;
  protected mobileRedirectUrl: string;
  protected redirectUrl: string;
  protected url: string;

  constructor(args: Args) {
    const { adminRedirectUrl, domain, isAdmin, isSpoofMode, mobileRedirectUrl, redirectUrl } = {
      ...this.defaults,
      ...args,
    };
    this.adminRedirectUrl = adminRedirectUrl;
    this.domain = domain;
    this.isMobile = isMobile.any;
    this.isAdmin = isAdmin;
    this.isSpoofMode = isSpoofMode;
    this.mobileRedirectUrl = mobileRedirectUrl;
    this.redirectUrl = redirectUrl;
    this.url = this.getUrl();
  }

  init(res: ServerResponse) {
    if (res) {
      res.writeHead(302, {
        Location: this.url,
      });
      res.end();
      res.finished = true;
    } else {
      Router.push(this.url);
    }
  }

  getUrl() {
    if (this.isMobile) {
      return this.mobileRedirect();
    } else if (this.isAdmin) {
      return this.adminRedirect();
    }
    return this.standardRedirect();
  }

  adminRedirect() {
    if (this.adminRedirectUrl) {
      return `/${this.domain}${this.adminRedirectUrl}`;
    } else if (!this.isSpoofMode) {
      return `/${this.domain}/administrator/payments/bookings/1`;
    }
    return this.standardRedirect();
  }

  mobileRedirect() {
    if (this.mobileRedirectUrl) {
      return `/${this.domain}${this.mobileRedirectUrl}`;
    }
    return `/${this.domain}`;
  }

  standardRedirect() {
    if (this.redirectUrl) {
      return `/${this.domain}${this.redirectUrl}`;
    }
    return `/${this.domain}/dashboard`;
  }
}

export default (res: ServerResponse, opts: Args) => {
  const redirect = new AuthRedirect(opts);
  const { isLoggedIn } = opts;
  if (isLoggedIn) {
    redirect.init(res);
  }
};
