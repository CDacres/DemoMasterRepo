import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';

type Props = {
  handleButton?: (e?: any) => void;
  request?: (e?: any) => void;
  requestInfo?: any;
  toConfirm?: any;
};

const ButtonContainer = ({ handleButton, request, requestInfo, toConfirm }: Props) => (
  <React.Fragment>
    {!requestInfo &&
      <div className={css(margin.top_3)}>
        <Translatable content={{ transKey: toConfirm ? 'room.confirm_viewing' : 'room.book_viewing' }}>
          <StyledButton
            action={handleButton}
            buttonColor="primary"
            customStyle={[pagestyles.fullColumn]}
          />
        </Translatable>
      </div>
    }
    {!toConfirm &&
      <div className={css(margin.top_3)}>
        <Translatable content={{ transKey: 'room.req_info' }}>
          <StyledButton
            action={request}
            buttonColor="grey"
            customStyle={[pagestyles.fullColumn]}
          />
        </Translatable>
      </div>
    }
  </React.Fragment>
);

export default ButtonContainer;
