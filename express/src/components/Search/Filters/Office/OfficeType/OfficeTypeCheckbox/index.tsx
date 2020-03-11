import * as React from 'react';

// Components
import StyledCheckboxComponent from '@src/components/concrete/Inputs/StyledCheckbox/StyledCheckboxComponent';

type Props = {
  checked: boolean;
  officeTypeId: string;
  onChange: (officeTypeId: string) => void;
  subtitle?: string;
  title: string;
};

const OfficeTypeCheckbox = ({ checked, officeTypeId, onChange, subtitle, title }: Props) => (
  <StyledCheckboxComponent
    checked={checked}
    id={`officeType_${officeTypeId}`}
    label={title}
    name={title}
    onToggle={() => onChange(officeTypeId)}
    sublabel={subtitle}
  />
);

export default OfficeTypeCheckbox;
