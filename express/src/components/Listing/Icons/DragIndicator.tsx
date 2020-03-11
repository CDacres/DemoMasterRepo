import * as React from 'react';
import { css } from 'aphrodite/no-important';

// MaterialUI
import { DragIndicator as DragIndicatorUI } from '@material-ui/icons';

// Styles
import styles from './styles';

const DragIndicator = () => (
  <DragIndicatorUI className={css(styles.drag)} />
);

export default DragIndicator;
