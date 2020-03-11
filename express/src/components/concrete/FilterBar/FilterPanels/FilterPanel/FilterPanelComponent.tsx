import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import panelStyles from '../styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element;
  render: () => JSX.Element;
};

const FilterPanelComponent = ({ children, render }: Props) => (
  <div
    className={css(styles.filterPanel, panelStyles.panel, padding.all_3)}
    role="menu"
  >
    <div className={css(styles.filterPanelWrapper)}>
      <div className={css(styles.filterPanelContainer)}>
        <div className={css(styles.filterPanelInner)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            {render()}
          </div>
        </div>
      </div>
    </div>
    {children}
  </div>
);

export default FilterPanelComponent;
