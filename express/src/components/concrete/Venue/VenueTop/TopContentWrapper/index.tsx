/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import venueStyles from '@src/components/concrete/VenuePage/styles'; // TODO: change this when when venue page is made
import { padding } from '@src/styles';

type Props = {
  children: JSX.Element;
  images?: boolean;
};

const TopContentWrapper = ({ children, images }: Props) => (
  <div className={css(styles.topWrapper, !images ? [styles.topWrapperNonImages, padding.top_4, padding.bottom_8] : null)}>
    <div className={css(venueStyles.pageInner, padding.leftright_2, padding.topbottom_0_small, padding.leftright_10_small)}>
      {children}
    </div>
  </div>
);

export default TopContentWrapper;
