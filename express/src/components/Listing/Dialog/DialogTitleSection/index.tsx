import * as React from 'react';

// MaterialUI
import { DialogTitle as DialogTitleUI } from '@material-ui/core';

// Components
import IconCloseButton from '@src/components/Listing/Buttons/IconCloseButton';
import Strip from '@src/components/Listing/Layout/Strip';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  onClose: VoidFunction;
  title: string;
};

const DialogTitleSection = ({ onClose, title }: Props) => (
  <DialogTitleUI>
    <Strip cols="1fr auto">
      <Spell word={title} />
      <IconCloseButton onClick={onClose} />
    </Strip>
  </DialogTitleUI>
);

export default DialogTitleSection;
