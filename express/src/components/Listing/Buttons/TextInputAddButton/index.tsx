import * as React from 'react';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  disabled: boolean;
  onClick: VoidFunction;
};

const TextInputAddButton = ({ disabled, onClick }: Props) => (
  <Button
    disabled={disabled}
    hasLeftBorder={true}
    noBorderRadius={true}
    noUpperCase={true}
    onClick={onClick}
  >
    <Spell word="common.add" />
  </Button>
);

export default TextInputAddButton;
