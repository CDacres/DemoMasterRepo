import * as React from 'react';

// Components
import StyledCheckboxComponent from '@src/components/concrete/Inputs/StyledCheckbox/StyledCheckboxComponent';

type Props = {
  checked: boolean;
  configurationId: string;
  onChange: (configurationId: string) => void;
  title: string;
  subtitle?: string;
};

const LayoutCheckbox = ({ checked, configurationId, onChange, subtitle, title }: Props) => (
  <StyledCheckboxComponent
    checked={checked}
    id={`config_${configurationId}`}
    label={title}
    name={title}
    onToggle={() => onChange(configurationId)}
    sublabel={subtitle}
  />
);

export default LayoutCheckbox;
