/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles, { buttonColorStyles, buttonStyles, spanColorStyles, spanStyles } from './styles';
import { padding } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';

// Types
import { ActionLink, ButtonColors, ButtonProps, ButtonStyles } from '@src/typings/types';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  customSpanStyle?: object[];
  customStyle?: object[];
} & ActionLink & ButtonColors & ButtonProps & ButtonStyles;

const StyledButton = ({ action, buttonColor, buttonStyle, children, customSpanStyle, customStyle, disabled, href, id, type }: Props) => (
  <Button
    action={action}
    disabled={disabled}
    href={href}
    id={id}
    stylesArray={[buttonColorStyles[buttonColor], buttonStyles[buttonStyle], customStyle]}
    type={type}
  >
    <span className={css(styles.buttonText, padding.topbottom_0, spanColorStyles[buttonColor], spanStyles[buttonStyle], customSpanStyle)}>
      {children}
    </span>
  </Button>
);

export default StyledButton;
