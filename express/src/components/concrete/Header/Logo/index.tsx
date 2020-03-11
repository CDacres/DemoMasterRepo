import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { RightSidebar } from '@src/components/abstract/MediaQuery';
import LogoAsDropdown from '@src/components/concrete/Header/Logo/LogoAsDropdown';
import LogoAsLink from '@src/components/concrete/Header/Logo/LogoAsLink';

type Props = {
  flyoutOpen: boolean;
  handleFlyoutMenu: () => void;
  smallLogo: boolean;
  stayAsLink: boolean;
};

const Logo = ({ flyoutOpen, handleFlyoutMenu, smallLogo, stayAsLink }: Props) => (
  <div className={css(styles.logoWrapper)}>
    <div>
      <div>
        {stayAsLink ? (
          <LogoAsLink smallLogo={smallLogo} />
        ) : (
          <RightSidebar>
            {matches => {
              if (matches) {
                return (
                  <LogoAsLink smallLogo={smallLogo} />
                );
              }
              return (
                <LogoAsDropdown
                  flyoutOpen={flyoutOpen}
                  handleFlyoutMenu={handleFlyoutMenu}
                />
              );
            }}
          </RightSidebar>
        )}
      </div>
    </div>
  </div>
);

export default Logo;
