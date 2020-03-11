import * as React from 'react';

// Components
import StyledCheckboxComponent from '@src/components/concrete/Inputs/StyledCheckbox/StyledCheckboxComponent';

type Props = {
  checked: boolean;
  onChange: (typeId: string) => void;
  subtitle?: string;
  title: string;
  typeId: string;
};

const TypeCheckbox = ({ checked, onChange, subtitle, title, typeId }: Props) => (
  <StyledCheckboxComponent
    checked={checked}
    id={`type_${typeId}`}
    label={title}
    name={title}
    onToggle={() => onChange(typeId)}
    sublabel={subtitle}
  />
);

export default TypeCheckbox;
