import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import logoStyles from '../styles';
import { padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import NavChevron from '@src/components/concrete/Header/NavChevron';
import { ZipcubeLogo } from '@src/components/concrete/Icons/svgs';

type Props = {
  flyoutOpen: boolean;
  handleFlyoutMenu: () => void;
};

const LogoAsDropdown = ({ flyoutOpen, handleFlyoutMenu }: Props) => (
  <Button
    action={handleFlyoutMenu}
    aria-label="Main navigation menu"
    aria-haspopup="true"
    stylesArray={[styles.buttonContainer, pagestyles.tableCell]}
  >
    <div className={css(logoStyles.content, pagestyles.tableCellMiddle, padding.leftright_3)}>
      <div className={css(pagestyles.inlineBlock)}>
        <div className={css(logoStyles.contentIconInner)}>
          <ZipcubeLogo
            stylesArray={[styles.zipcubeLogoSmallSvg]}
            viewBox="8 7 10 30"
          />
        </div>
      </div>
      <div className={css(pagestyles.inlineBlock)}>
        <NavChevron navRotated={flyoutOpen} />
      </div>
    </div>
  </Button>
);

export default LogoAsDropdown;
