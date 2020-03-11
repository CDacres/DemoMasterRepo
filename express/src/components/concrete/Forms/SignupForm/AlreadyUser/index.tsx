import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';

const AlreadyUser = () => (
  <div className={css(pagestyles.centerActions)}>
    <Translatable content={{ transKey: 'users.already_have_account' }}>
      <div className={css(pagestyles.tableCellMiddle, pagestyles.leftText, pagestyles.halfColumn)} />
    </Translatable>
    <div className={css(pagestyles.tableCellMiddle, pagestyles.rightText, pagestyles.halfColumn)}>
      <Translatable content={{ transKey: 'common.login' }}>
        <StyledButton href="/users/signin" />
      </Translatable>
    </div>
  </div>
);

export default AlreadyUser;
