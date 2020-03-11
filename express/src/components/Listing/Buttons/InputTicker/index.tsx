import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Add from '@src/components/Listing/Icons/Add';
import Remove from '@src/components/Listing/Icons/Remove';

type Props = {
  icon: 'plus' | 'minus';
  onClick: VoidFunction;
};

const InputTicker = ({ icon, onClick }: Props) => (
  <Button
    className={css(styles.button)}
    color="secondary"
    hasLeftBorder={true}
    noBorderRadius={true}
    onClick={onClick}
    size="small"
  >
    {icon === 'minus' ? (
      <Remove />
    ) : (
      <Add />
    )}
  </Button>
);

export default InputTicker;
