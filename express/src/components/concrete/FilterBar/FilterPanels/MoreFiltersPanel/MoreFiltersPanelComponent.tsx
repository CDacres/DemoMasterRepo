import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import panelStyles from '../styles';
import { padding } from '@src/styles';

// Components
import MoreFiltersPanelFooter from '@src/components/concrete/FilterBar/FilterPanels/MoreFiltersPanel/MoreFiltersPanelFooter';

type Props = {
  canClear: boolean;
  children: JSX.Element | JSX.Element[];
  onApply: () => void;
  onClear: () => void;
};

const MoreFiltersPanelComponent = ({ canClear, children, onApply, onClear }: Props) => (
  <div
    className={css(styles.panel, panelStyles.panel, padding.all_0)}
    role="menu"
  >
    <div className={css(styles.panelWrapper)}>
      <div className={css(styles.panelContainer, padding.top_6, padding.leftright_3, padding.bottom_4)}>
        {children}
      </div>
      <MoreFiltersPanelFooter
        canClear={canClear}
        onApply={onApply}
        onClear={onClear}
      />
    </div>
  </div>
);

export default MoreFiltersPanelComponent;
