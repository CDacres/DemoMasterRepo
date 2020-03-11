import * as React from 'react';

import { CSR, RequiresLogIn } from '@src/components/pagebuilders';
import PageTemplate from '@src/components/base/PageTemplate';
import { materialTheme } from '@src/core/ux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import VenuePageMobxWrapper from './VenuePageMobxWrapper';
import useConfig, { Props as ConfigProps } from '@src/store/connectors/config';
import { withToast } from '@src/components/pagebuilders';

type Props = {
  url: string;
} & ConfigProps;

const VenuePageWrapper = (props: Props) => {
  const { config: { domain }, url } = props;
  return (
    <React.Fragment>
      <RequiresLogIn>
        <CSR>
          <MuiThemeProvider theme={materialTheme}>
            <PageTemplate
              disableFooter={true}
              url={url}
            >
              <VenuePageMobxWrapper
                domain={domain}
                url={url}
              />
            </PageTemplate>
          </MuiThemeProvider>
        </CSR>
      </RequiresLogIn>
    </React.Fragment>
  );
};

export default withToast(useConfig(VenuePageWrapper));
