/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  bottomText?: string;
  cancelChildren?: JSX.Element;
  cancelText?: string;
  onCancelClick: () => void;
  onSuccessClick: () => void;
  successChildren?: JSX.Element;
  successText?: string;
};

const ModalBottom = ({ bottomText, cancelChildren, cancelText, onSuccessClick, onCancelClick, successChildren, successText }: Props) => (
  <footer>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.inlineBlock, margin.bottom_1, margin.right_1)}>
        {successChildren ? (
          <StyledButton
            action={onSuccessClick}
            buttonColor="primary"
            buttonStyle="updated"
          >
            {successChildren}
          </StyledButton>
        ) : (
          <Translatable content={{ transKey: successText }}>
            <StyledButton
              action={onSuccessClick}
              buttonColor="primary"
              buttonStyle="updated"
            />
          </Translatable>
        )}
      </div>
      <div className={css(pagestyles.inlineBlock, margin.bottom_1)}>
        {cancelChildren ? (
          <StyledButton action={onCancelClick}>
            {cancelChildren}
          </StyledButton>
        ) : (
          <Translatable content={{ transKey: cancelText ? cancelText : 'common.cancel' }}>
            <StyledButton
              action={onCancelClick}
              buttonStyle="updated"
            />
          </Translatable>
        )}
      </div>
    </div>
    {bottomText &&
      <div className={css(margin.top_2)}>
        <Translatable content={{ transKey: bottomText }}>
          <div className={css(styles.footerText, pagestyles.smallText, margin.all_0)} />
        </Translatable>
      </div>
    }
  </footer>
);

export default ModalBottom;
