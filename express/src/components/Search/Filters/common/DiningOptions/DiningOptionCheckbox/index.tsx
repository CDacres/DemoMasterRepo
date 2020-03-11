import * as React from 'react';

// Components
import StyledCheckboxComponent from '@src/components/concrete/Inputs/StyledCheckbox/StyledCheckboxComponent';

type Props = {
  checked: boolean;
  diningOptionId: string;
  onChange: (configurationId: string) => void;
  title: string;
};

const DiningOptionCheckbox = ({ checked, diningOptionId, onChange, title }: Props) => (
  <StyledCheckboxComponent
    checked={checked}
    id={`diningOption_${diningOptionId}`}
    label={title}
    name={title}
    onToggle={() => onChange(diningOptionId)}
  />
);

export default DiningOptionCheckbox;
