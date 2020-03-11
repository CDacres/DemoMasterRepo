import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { ActionLink, ButtonProps } from '@src/typings/types';

type Props = {
  isWhite?: boolean;
  text: string;
} & ActionLink & ButtonProps;

const TableButton = ({ action, href, isWhite, text }: Props) => (
  <div className={css(pagestyles.inlineBlock)}>
    <Translatable content={{ transKey: text }}>
      <StyledButton
        action={action}
        href={href}
        buttonColor={isWhite ? 'link' : 'primary'}
        customSpanStyle={[styles.span]}
        customStyle={[styles.button]}
      />
    </Translatable>
  </div>
);

export default TableButton;
