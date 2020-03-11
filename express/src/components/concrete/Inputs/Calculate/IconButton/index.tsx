import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';

// Types
import { ActionLink, ButtonProps } from '@src/typings/types';

type Props = {
  children: JSX.Element;
} & ActionLink & ButtonProps;

const IconButton = ({ action, children, disabled }: Props) => (
  <Button
    action={action}
    disabled={disabled}
    stylesArray={[styles.signButton, padding.all_0]}
  >
    <span className={css(styles.signContainer, disabled ? styles.signContainerDisabled : styles.signContainerEnabled)}>
      {children}
    </span>
  </Button>
);

export default IconButton;
