import Router from 'next/router';
import isMobile from 'ismobilejs';
import { ServerResponse } from 'http';

type DefaultArgs = {
  mobileRedirectUrl?: string;
  redirectUrl?: string;
};
type Args = DefaultArgs & {
  domain: string;
};

class Redirect {
  protected defaults: DefaultArgs = {
    mobileRedirectUrl: null,
    redirectUrl: null,
  };
  protected domain: string;
  protected isMobile: boolean;
  protected mobileRedirectUrl: string;
  protected redirectUrl: string;
  protected url: string;

  constructor(args: Args) {
    const { domain, mobileRedirectUrl, redirectUrl } = {
      ...this.defaults,
      ...args,
    };

    this.domain = domain;
    this.isMobile = isMobile.any;
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
  const redirect = new Redirect(opts);
  redirect.init(res);
};
