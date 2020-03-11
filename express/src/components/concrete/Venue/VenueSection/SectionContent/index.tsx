import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

type Props = {
  children: JSX.Element;
  isVertical?: boolean;
};

const SectionContent = ({ children, isVertical }: Props) => (
  <div className={css(styles.contentWrapper, !isVertical ? styles.horizontalWrapper : margin.left_0)}>
    {children}
  </div>
);

export default SectionContent;
