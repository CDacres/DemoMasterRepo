import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

const colorMap = {
  lightGrey: '#767676',
  dark: '#484848',
  darkGrey: '#585a3a',
};

const sizeMap = {
  default: '14px',
  medium: '16px',
};

const weightMap = {
  semiBold: 600,
  bold: 800,
};

type Props = {
  text: string;
  color?: string;
  size?: string;
  weight?: string;
};

const AccentUpperText: React.FunctionComponent<Props> = ({ text, color, size, weight }) => (
  <small
    className={css(styles.font)}
    style={{
      fontWeight: weightMap[weight],
      color: colorMap[color],
      fontSize: sizeMap[size],
    }}
  >
    <Translatable content={{ transKey: text }} />
  </small>
);

AccentUpperText.defaultProps = {
  color: 'lightGrey',
  size: 'default',
  weight: 'bold',
};

export default AccentUpperText;
