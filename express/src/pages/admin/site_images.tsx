import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import { Request, Response } from 'express';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Utils
import { adminAuthCheck } from '@src/utils';

// Redux stuff
import { attachReducers } from '@src/store';
import adminReducer from '@src/store/modules/admin';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import withLegacy from '@src/components/pagebuilders/legacy';
import PageTemplate from '@src/components/base/PageTemplate';
import SiteImagesUpload from '@src/components/concrete/Admin/SiteImagesUpload';

// Types
import { Store } from '@src/typings/types';

type Props = PageProps & {
  reduxStore: ReduxStore<any>;
  req: Request;
  res: Response;
  siteImages: Store.Admin.SiteImages;
  store: ReduxStore<any>;
  uploadImageFile: (contentType: string, base64: string, imageTypeId: string) => void;
  uploadImageUrl: (contentType: string, url: string) => void;
};

class SiteImages extends React.Component<Props, {}> {
  static async getInitialProps({ state: { redux }, req, res }: Ctx) {
    const isServer = !!req;

    attachReducers(redux, { admin: adminReducer });

    await initStateGenerator(isServer, redux, req);

    const { auth: { user: { isAdmin, isLoggedIn, isSpoofMode } }, config: { domain } } = redux.getState();
    adminAuthCheck(res, { domain, isAdmin, isLoggedIn, isSpoofMode });

    return {};
  }

  componentDidMount() {
    const { store } = this.props;

    // Attach reducer for a second time on the client-side
    attachReducers(store, { admin: adminReducer });
  }

  render() {
    return (
      <PageTemplate>
        <div className={css(pagestyles.container)}>
          <SiteImagesUpload />
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(useConfig(SiteImages));
