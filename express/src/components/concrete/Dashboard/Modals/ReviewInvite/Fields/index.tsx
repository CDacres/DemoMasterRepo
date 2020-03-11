import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

const Fields = () => (
  <React.Fragment>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <StyledInput
            boldLabel={true}
            id="first_name"
            label="users.first_name"
            name="first_name"
            required={true}
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <StyledInput
            boldLabel={true}
            id="last_name"
            label="users.last_name"
            name="last_name"
          />
        </div>
      </div>
    </div>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
          <StyledInput
            boldLabel={true}
            id="email"
            label="users.email"
            name="email"
            required={true}
          />
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Fields;
