import * as React from 'react';
// import Head from 'next/head';
import { Store as ReduxStore } from 'redux';
import { Request, Response } from 'express';
import { css } from 'aphrodite/no-important';
import { withToast } from '@src/components/pagebuilders';
import withLegacy from '@src/components/pagebuilders/legacy';

// Styles
import { margin, pagestyles } from '@src/styles';

// Utils
import { authRedirect } from '@src/utils';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import PageTemplate from '@src/components/base/PageTemplate';
import SignupForm from '@src/components/concrete/Forms/SignupForm';

type Props = PageProps & {
  reduxStore: ReduxStore<any>;
  req: Request;
  res: Response;
};

class Signup extends React.Component<Props, {}> {
  static async getInitialProps({ state: { redux }, req, res }: Ctx) {
    const isServer = !!req;

    await initStateGenerator(isServer, redux, req);

    const { auth: { user: { isAdmin, isLoggedIn, isSpoofMode } }, config: { domain } } = redux.getState();
    authRedirect(res, { domain, isAdmin, isLoggedIn, isSpoofMode });

    return {};
  }

  render() {
    return (
      <PageTemplate>
        {/* <Head>
          <script
            type="text/javascript"
            src="//platform.linkedin.com/in.js"
            dangerouslySetInnerHTML={{
              __html: `
                api_key: ${process.env.LINKEDIN_APP_ID}
              `,
            }}
          />
        </Head> */}
        <div className={css(pagestyles.container, margin.topbottom_5)}>
          <div className={css(pagestyles.centerWrapper)}>
            <div className={css(pagestyles.centerInterior)}>
              <SignupForm />
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(withToast(Signup));
