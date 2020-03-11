import * as React from 'react';

// Components
import StyledCheckboxComponent from '@src/components/concrete/Inputs/StyledCheckbox/StyledCheckboxComponent';

type Props = {
  amenityId: string;
  checked: boolean;
  onChange: (amenityId: string) => void;
  title: string;
};

const AmenityCheckbox = ({ amenityId, checked, onChange, title }: Props) => (
  <StyledCheckboxComponent
    checked={checked}
    id={`amenity_${amenityId}`}
    label={title}
    name={title}
    onToggle={() => onChange(amenityId)}
  />
);

export default AmenityCheckbox;
