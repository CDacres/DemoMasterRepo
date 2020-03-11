import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Close from '@src/components/Listing/Icons/Close';

type Props = {
  onClick: VoidFunction;
};

const CloseButton = ({ onClick }: Props) => (
  <Button
    buttonType="basic"
    className={css(styles.remove)}
    onClick={onClick}
  >
    <Close />
  </Button>
);

export default CloseButton;
