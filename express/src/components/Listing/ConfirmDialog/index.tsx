import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  open: boolean;
  text: string;
  title: string;
};

const ConfirmDialog = ({ onClose, onSubmit, open, text, title }: Props) => (
  <Dialog
    onClose={onClose}
    open={open}
    scroll="paper"
  >
    <DialogTitleSection
      onClose={onClose}
      title={title}
    />
    <DialogContentSection>
      <Spell word={text} />
    </DialogContentSection>
    <DialogActionSection>
      <Button onClick={onClose}>
        <Spell word="common.cancel" />
      </Button>
      <div className={css(styles.red)}>
        <Button
          color="inherit"
          onClick={onSubmit}
        >
          <Spell word="common.delete" />
        </Button>
      </div>
    </DialogActionSection>
  </Dialog>
);

export default ConfirmDialog;
