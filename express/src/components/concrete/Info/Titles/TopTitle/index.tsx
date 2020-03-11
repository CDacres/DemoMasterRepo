import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import titleStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import BaseTitle from '@src/components/concrete/Info/Titles/BaseTitle';
import SubTitle from '@src/components/concrete/Info/Titles/SubTitle';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  buttonHref: string;
  buttonText: string;
  name: string;
  subtitle: string;
  title: string;
};

const TopTitle = ({ buttonHref, buttonText, name, subtitle, title }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div className={css(pagestyles.pageContainerTextAlignSmall)}>
      <div className={css(margin.bottom_2)}>
        <Translatable content={{ transKey: name }}>
          <div className={css(styles.title, pagestyles.smallText, pagestyles.fontBlack, margin.all_0)} />
        </Translatable>
      </div>
      <BaseTitle
        stylesArray={[titleStyles.bold, titleStyles.black]}
        title={title}
      />
      <SubTitle subtitle={subtitle} />
      <div className={css(margin.top_4, margin.top_5_small, margin.top_6_large)}>
        <Translatable content={{ transKey: buttonText }}>
          <StyledButton
            buttonColor="primary"
            buttonStyle="updated"
            href={buttonHref}
          />
        </Translatable>
      </div>
    </div>
  </SectionInner>
);

export default TopTitle;
