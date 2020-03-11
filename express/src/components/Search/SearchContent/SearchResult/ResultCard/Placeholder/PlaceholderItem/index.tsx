import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import placeholderStyles from '../styles';
import { pagestyles } from '@src/styles';

type Props = {
  width: number;
};

const PlaceholderItem = ({ width }: Props) => (
  <div className={css(styles.twoLineTitle, pagestyles.textMap)}>
    <span className={css(styles.text)}>
      <span
        aria-busy="true"
        className={css(placeholderStyles.shimmerAnimation)}
        style={{
          width: `${Math.floor(Math.random() * 31) + width}%`,
          height: '1ex',
        }}
      />
    </span>
  </div>
);

export default PlaceholderItem;
