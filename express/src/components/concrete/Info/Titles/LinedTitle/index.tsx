import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import titleStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import BaseTitle from '@src/components/concrete/Info/Titles/BaseTitle';
import SubTitle from '@src/components/concrete/Info/Titles/SubTitle';

type Props = {
  subtitle?: string;
  title: string;
};

const LinedTitle = ({ subtitle, title }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div className={css(pagestyles.pageContainerTextAlignSmall)}>
      <div className={css(margin.bottom_3)}>
        <div className={css(styles.line)} />
      </div>
      <BaseTitle
        stylesArray={[titleStyles.bold, titleStyles.black]}
        title={title}
      />
      {subtitle &&
        <SubTitle subtitle={subtitle} />
      }
    </div>
  </SectionInner>
);

export default LinedTitle;
