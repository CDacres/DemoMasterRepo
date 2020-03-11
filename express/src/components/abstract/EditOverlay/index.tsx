import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  onClick: () => void;
};

const EditOverlay = ({ onClick }: Props) => (
  <div
    className={css(styles.editOverlay)}
    onClick={onClick}
  >
    <div className={css(styles.editOverlayText)}>
      Edit
    </div>
  </div>
);

export default EditOverlay;
