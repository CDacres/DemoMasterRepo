import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  pit: {
    background: '#767676',
    display: 'inline-block',
    width: '2%',
    bottom: '0px'
  }
});

const PitComponent = ({ style }) => (
  <div
    className={css(styles.pit)}
    style={style}
  />
);

export default PitComponent;
