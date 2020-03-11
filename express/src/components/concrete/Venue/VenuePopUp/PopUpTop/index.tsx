import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import CloseButton from '@src/components/concrete/Button/CloseButton';

// Types
import { ActionLink } from '@src/typings/types';

const PopUpTop = ({ action }: ActionLink) => (
  <div className={css(styles.wrapper)}>
    <div className={css(margin.left_3)}>
      <CloseButton
        action={action}
        closeStyle={[styles.closeButtonIcon, pagestyles.icon16]}
        customStyle={[styles.closeButton, padding.all_3]}
      />
    </div>
  </div>
);

export default PopUpTop;
