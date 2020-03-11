/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

// Components
import Item from '@src/components/concrete/Table/InteractionTable/CheckboxColumns/Item';

// Types
import { StyledCheckboxProps } from '@src/typings/types';

type Props = {
  checkboxes: StyledCheckboxProps[][];
  isLarge?: boolean;
};

const CheckboxColumns = ({ checkboxes, isLarge }: Props) => (
  <div className={css(pagestyles.row, pagestyles.clearfix)}>
    {checkboxes.map((item, index) => (
      <div
        className={css(pagestyles.column, padding.leftright_1, isLarge ? pagestyles.halfColumnLargeScreen : pagestyles.halfColumnSmallScreen)}
        key={index}
      >
        <Item data={item} />
      </div>
    ))}
  </div>
);

export default CheckboxColumns;
