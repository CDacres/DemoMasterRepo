import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';

type Props = {
  navRotated: boolean;
};

const NavChevron = ({ navRotated }: Props) => (
  <div className={css(styles.chevronWrapper, margin.left_1)}>
    <div
      className={css(styles.chevronContainer, pagestyles.tableCellMiddle)}
      style={{ transform: navRotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <Chevron stylesArray={[pagestyles.icon]} />
    </div>
  </div>
);

export default NavChevron;
