/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { Chevron } from '@src/components/concrete/Icons/svgs';

type Props = {
  isSmall?: boolean;
};

const LearnMore = ({ isSmall }: Props) => (
  <div>
    <div className={css(pagestyles.inlineBlock, pagestyles.fontMedium, margin.top_1_5, isSmall ? styles.smallScreenWrapper : [styles.wrapper, margin.top_2_large])}>
      <span className={css(styles.container)}>
        <Translatable content={{ transKey: 'common.learn_more' }} />
        <span className={css(styles.icon, margin.leftright_0_75)}>
          <Chevron
            direction="right"
            stylesArray={[styles.chevron]}
          />
        </span>
      </span>
    </div>
  </div>
);

export default LearnMore;
