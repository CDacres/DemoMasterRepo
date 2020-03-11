import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import ZipcubeBrand from '@src/components/concrete/ZipcubeBrand';

type Props = {
  smallLogo: boolean;
};

const LogoAsLink = ({ smallLogo }: Props) => (
  <BrowserLink
    attributes={{ title: { transKey: 'common.home' } }}
    className={css(pagestyles.tableCell)}
    href="/"
  >
    <div className={css(styles.content)}>
      <div className={css(styles.contentIconInner)}>
        <ZipcubeBrand showName={!smallLogo} />
      </div>
      <div className={css(styles.menuIndicator)} />
    </div>
  </BrowserLink>
);

export default LogoAsLink;
