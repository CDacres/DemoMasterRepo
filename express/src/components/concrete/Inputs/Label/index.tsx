import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

type Props = {
  text?: string;
};

const Label = ({ text }: Props) => (
  <label className={css(styles.hiddenLabel, padding.all_0)}>
    {text}
  </label>
);

export default Label;
