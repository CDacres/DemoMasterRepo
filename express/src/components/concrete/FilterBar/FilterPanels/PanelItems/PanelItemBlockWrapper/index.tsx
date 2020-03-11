import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import panelStyles from '../../styles';
import { margin, pagestyles } from '@src/styles';

type Props = {
  description?: JSX.Element;
  learnMore?: JSX.Element;
  subtitle?: JSX.Element;
  rightElement?: JSX.Element;
};

const PanelItemBlockWrapper = ({ description, learnMore, rightElement, subtitle }: Props) => (
  <div className={css(panelStyles.tableWrapper)}>
    <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
      <div className={css(margin.right_3)}>
        {subtitle}
        {description}
        {learnMore}
      </div>
    </div>
    {rightElement}
  </div>
);

export default PanelItemBlockWrapper;
