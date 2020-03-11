/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { ButtonColor } from '@src/typings/types';

type Props = {
  collapsed?: boolean;
  firstButtonEvent: () => void;
  firstButtonStyle?: ButtonColor;
  firstButtonText: string;
  secondButtonEvent?: () => void;
  secondButtonStyle?: ButtonColor;
};

const BusinessButtons = ({ collapsed, firstButtonEvent, firstButtonStyle, firstButtonText, secondButtonEvent, secondButtonStyle }: Props) => (
  <React.Fragment>
    {collapsed ? (
      <React.Fragment>
        <div className={css(pagestyles.inlineBlock, margin.right_1)}>
          <Translatable content={{ transKey: firstButtonText }}>
            <StyledButton
              action={firstButtonEvent}
              buttonColor={firstButtonStyle ? firstButtonStyle : 'primary'}
              buttonStyle="updated"
            />
          </Translatable>
        </div>
        <Translatable content={{ transKey: 'common.cancel' }}>
          <StyledButton
            action={secondButtonEvent}
            buttonColor={secondButtonStyle ? secondButtonStyle : 'link'}
            buttonStyle="updated"
          />
        </Translatable>
      </React.Fragment>
    ) : (
      <Translatable content={{ transKey: firstButtonText }}>
        <StyledButton
          action={firstButtonEvent}
          buttonColor={firstButtonStyle ? firstButtonStyle : 'link'}
          buttonStyle="updated"
        />
      </Translatable>
    )}
  </React.Fragment>
);

export default BusinessButtons;
