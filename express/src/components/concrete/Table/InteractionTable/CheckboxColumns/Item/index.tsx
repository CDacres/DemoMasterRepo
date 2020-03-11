import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';

// Types
import { StyledCheckboxProps } from '@src/typings/types';

type Props = {
  data: StyledCheckboxProps[];
};

const Item = ({ data }: Props) => (
  <React.Fragment>
    {data.map((item, index) => (
      <div
        className={css(margin.topbottom_1_5)}
        key={index}
      >
        <StyledCheckbox
          disabled={item.disabled}
          id={item.id}
          label={item.label}
          name={item.name}
        />
      </div>
    ))}
  </React.Fragment>
);

export default Item;
