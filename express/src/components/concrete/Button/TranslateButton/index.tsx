import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  blackButton?: boolean;
  buttonText: string;
  handleClick: (e?: any) => void;
};

const TranslateButton = ({ blackButton, buttonText, handleClick }: Props) => (
  <div className={css(margin.top_2, blackButton ? margin.bottom_1 : null)}>
    <div>
      <StyledButton
        action={handleClick}
        buttonColor={blackButton ? 'black' : 'white'}
        buttonStyle="updated"
      >
        {blackButton ? (
          <div className={css(styles.buttonContainer, pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
            <div className={css(styles.buttonInner)}>
              <div className={css(margin.right_1)}>
                <img
                  className={css(pagestyles.icon24)}
                  src="/_express/images/commonsite/translate.jpg"
                />
              </div>
              <Translatable content={{ transKey: buttonText }} />
            </div>
          </div>
        ) : (
          <Translatable content={{ transKey: buttonText }} />
        )}
      </StyledButton>
    </div>
  </div>
);

export default TranslateButton;
