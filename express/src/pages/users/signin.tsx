import * as React from 'react';
// import Head from 'next/head';
import { Store as ReduxStore } from 'redux';
import { Request, Response } from 'express';
import { css } from 'aphrodite/no-important';
import { withToast } from '@src/components/pagebuilders';
import withLegacy from '@src/components/pagebuilders/legacy';
import { NextPage } from 'next';

// Styles
import { margin, pagestyles } from '@src/styles';

// Utils
import { authRedirect } from '@src/utils';

// Components
import { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import PageTemplate from '@src/components/base/PageTemplate';
import LoginForm from '@src/components/concrete/Forms/LoginForm';

type Props = PageProps & {
  reduxStore: ReduxStore<any>;
  req: Request;
  res: Response;
};

const Meat: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className={css(pagestyles.container, margin.topbottom_5)}>
        <div className={css(pagestyles.centerWrapper)}>
          <div className={css(pagestyles.centerInterior)}>
            <LoginForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const WrappedMeat = withToast(Meat);

const Signin: NextPage<Props, {}> = (_: Props) => {
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
      <WrappedMeat />
    </PageTemplate>
  );
};

Signin.getInitialProps = async ({ state: { redux }, res }: Ctx): Promise<{}> => {
  const { auth: { user: { isAdmin, isLoggedIn, isSpoofMode } }, config: { domain } } = redux.getState();
  authRedirect(res, { domain, isAdmin, isLoggedIn, isSpoofMode });
  return {};
};

export default withLegacy(Signin);
