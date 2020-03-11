import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import { Plus } from '@src/components/concrete/Icons/svgs';

type Props = {
  children: React.ReactNode;
  onClick: VoidFunction;
};

const AddButton = ({ children, onClick }: Props) => (
  <Button
    buttonType="basic"
    color="primary"
    onClick={onClick}
  >
    <div className={css(styles.container)}>
      <Plus stylesArray={[styles.icon]} />
      {children}
    </div>
  </Button>
);

export default AddButton;
