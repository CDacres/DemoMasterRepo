import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import { Request } from 'express';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import withLegacy from '@src/components/pagebuilders/legacy';
import PageTemplate from '@src/components/base/PageTemplate';
import RequestPasswordForm from '@src/components/concrete/Forms/RequestPasswordForm';
import { withToast } from '@src/components/pagebuilders';

type Props = PageProps & {
  reduxStore: ReduxStore<any>;
  req: Request;
};

class RequestNewPassword extends React.Component<Props, {}> {
  static async getInitialProps({ state: { redux }, req }: Ctx) {
    const isServer = !!req;

    await initStateGenerator(isServer, redux, req);

    return {};
  }

  render() {
    return (
      <PageTemplate>
        <div className={css(pagestyles.container, margin.topbottom_5)}>
          <div className={css(pagestyles.centerWrapper)}>
            <div className={css(pagestyles.centerInterior)}>
              <RequestPasswordForm />
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(withToast(RequestNewPassword));
