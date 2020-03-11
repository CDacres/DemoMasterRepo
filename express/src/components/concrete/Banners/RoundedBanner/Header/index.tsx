import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  header: string;
  isSmall?: boolean;
};

const Header = ({ header, isSmall }: Props) => (
  <div className={css(isSmall ? [styles.smallScreenWrapper, pagestyles.fontMedium] : [styles.wrapper, margin.top_2])}>
    <Translatable content={{ transKey: header }}>
      <span className={css(styles.container)} />
    </Translatable>
  </div>
);

export default Header;
