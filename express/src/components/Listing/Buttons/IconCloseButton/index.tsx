import * as React from 'react';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Close from '@src/components/Listing/Icons/Close';

type Props = {
  isLarge?: boolean;
  onClick: VoidFunction;
};

const IconCloseButton = ({ isLarge, onClick }: Props) => (
  <Button
    buttonType="icon"
    onClick={onClick}
    {...(isLarge ? { size: 'large' } : {})}
  >
    <Close isLarge={isLarge} />
  </Button>
);

export default IconCloseButton;
