import Router from 'next/router';
import isMobile from 'ismobilejs';
import { ServerResponse } from 'http';

type Args = {
  domain: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
  isSpoofMode: boolean;
};

class AdminAuthCheck {
  protected domain: string;

  constructor(args: Args) {
    const { domain } = args;
    this.domain = domain;
  }

  redirect(res: ServerResponse) {
    if (res) {
      res.writeHead(302, {
        Location: `/${this.domain}/users/signin`,
      });
      res.end();
      res.finished = true;
    } else {
      Router.push(`/${this.domain}/users/signin`);
    }
  }
}

export default (res: ServerResponse, opts: Args) => {
  const adminAuthCheck = new AdminAuthCheck(opts);
  const { isAdmin, isLoggedIn, isSpoofMode } = opts;
  if (isMobile.any || !isLoggedIn || !(isAdmin || isSpoofMode)) {
    adminAuthCheck.redirect(res);
  }
};
