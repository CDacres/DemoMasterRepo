import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import { Request } from 'express';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Data
import { sideMenu, termsOfUse, venuePolicy, privacyPolicy } from '@src/data/pages/legal';

// Components
import withLegacy from '@src/components/pagebuilders/legacy';
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import PageTemplate from '@src/components/base/PageTemplate';
import LegalSideMenu from '@src/components/concrete/Legal/LegalSideMenu';
import LegalTextBlock from '@src/components/concrete/Legal/LegalTextBlock';

type Props = PageProps & {
  reduxStore: ReduxStore<any>;
  req: Request;
};

class LegalPage extends React.Component<Props, {}> {

  static async getInitialProps({ state: { redux }, req }: Ctx): Promise<object> {
    const isServer = !!req;
    await initStateGenerator(isServer, redux, req);
    return {};
  }

  render() {
    return (
      <PageTemplate>
        <div className={css(pagestyles.container, margin.topbottom_5)}>
          <LegalSideMenu sideMenu={sideMenu} />
          <LegalTextBlock sections={[termsOfUse, venuePolicy, privacyPolicy]} />
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(LegalPage);
