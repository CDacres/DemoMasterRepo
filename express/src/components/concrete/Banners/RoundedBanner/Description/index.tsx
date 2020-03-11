/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  description: string;
  isSmall?: boolean;
};

const Description = ({ description, isSmall }: Props) => (
  <div className={css(isSmall ? [styles.smallScreenWrapper, margin.top_0_5] : [styles.wrapper, margin.top_1, margin.top_2_large])}>
    <Translatable content={{ transKey: description }}>
      <span className={css(styles.container)} />
    </Translatable>
  </div>
);

export default Description;
