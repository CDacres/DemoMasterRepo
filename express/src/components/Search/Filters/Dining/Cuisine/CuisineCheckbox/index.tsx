import * as React from 'react';

// Components
import StyledCheckboxComponent from '@src/components/concrete/Inputs/StyledCheckbox/StyledCheckboxComponent';

type Props = {
  checked: boolean;
  cuisineId: string;
  onChange: (cuisineId: string) => void;
  title: string;
};

const CuisineCheckbox = ({ checked, onChange, title, cuisineId }: Props) => (
  <StyledCheckboxComponent
    checked={checked}
    id={`cuisine_${cuisineId}`}
    label={title}
    name={title}
    onToggle={() => onChange(cuisineId)}
  />
);

export default CuisineCheckbox;
