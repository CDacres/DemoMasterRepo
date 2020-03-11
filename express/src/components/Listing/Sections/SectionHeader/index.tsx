import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import DeviceQuery from '@src/components/Listing/Layout/DeviceQuery';

type Props = {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
};

const SectionHeader = ({ children, tooltip }: Props) => (
  <div className={css(styles.container)}>
    <div>
      {children}
    </div>
    {tooltip &&
      <DeviceQuery variant="smallMedium">
        {tooltip}
      </DeviceQuery>
    }
  </div>
);

export default SectionHeader;
