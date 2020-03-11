import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Components
import ToggleSwitch from '@src/components/concrete/Inputs/ToggleSwitch';

type Props = {
  handleChange: () => void;
  selected: boolean;
};

const PanelItemToggle = ({ handleChange, selected }: Props) => (
  <div className={css(pagestyles.tableCellTop)}>
    <ToggleSwitch
      value={selected}
      onChange={handleChange}
    />
  </div>
);

export default PanelItemToggle;
