/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element;
  isLarge?: boolean;
  needsMinWidth?: boolean;
  with2?: boolean;
};

const FilterPanelItem = ({ children, isLarge, needsMinWidth, with2 }: Props) => (
  <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, pagestyles.fullColumnLargeScreen, pagestyles.fullColumnSmallScreen, padding.leftright_1, with2 ? pagestyles.halfColumnLargeScreen : null)}>
    <div className={css(!isLarge ? [styles.filterItemContainer, margin.bottom_2, margin.left_0_25] : margin.bottom_1)}>
      <div {...(needsMinWidth ? { className: css(with2 ? styles.filterItemWidthWith2 : styles.filterItemWidth) } : {})}>
        {children}
      </div>
    </div>
  </div>
);

export default FilterPanelItem;
