import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  isSmall?: boolean;
  title: string;
};

const Title = ({ isSmall, title }: Props) => (
  <div className={css(pagestyles.fontMedium, isSmall ? [styles.smallScreenWrapper, margin.bottom_2] : styles.wrapper)}>
    <Translatable content={{ transKey: title }}>
      <span className={css(styles.container)} />
    </Translatable>
  </div>
);

export default Title;
