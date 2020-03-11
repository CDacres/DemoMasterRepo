import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import panelStyles from '../../styles';
import { pagestyles } from '@src/styles';

// Components
import Select from '@src/components/concrete/Inputs/Select';

// Types
import { SelectOption } from '@src/typings/types';

type Props = {
  handleChange: (value: string) => void;
  options: SelectOption[];
  value: string;
};

const PanelItemSelect = ({ handleChange, options, value }: Props) => (
  <div className={css(pagestyles.tableCellTop)}>
    <div className={css(panelStyles.rightElementContainer)}>
      <Select
        onChange={handleChange}
        options={options}
        value={value}
      />
    </div>
  </div>
);

export default PanelItemSelect;
