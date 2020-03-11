import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

const LandingMapComponent = ({ handleComponentMount }) => (
  <div
    className={css(styles.container)}
    ref={handleComponentMount}
  />
);

export default LandingMapComponent;
