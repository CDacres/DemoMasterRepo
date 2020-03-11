import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import Section from '@src/components/concrete/Info/Section';
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import BaseTitle from '@src/components/concrete/Info/Titles/BaseTitle';

type Props = {
  buttonHref: string;
  buttonText: string;
  height: string;
  src: string;
  title: string;
  width: string;
};

const InfoBanner = ({ buttonHref, buttonText, height, src, title, width }: Props) => (
  <div>
    <SectionInner>
      <div className={css(styles.content)}>
        <div
          className={css(styles.background)}
          style={{
            width: width,
            height: height,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundImage: `url(${src})`,
          }}
        />
        <Section>
          <BaseTitle
            hasSetLetterSpacing={false}
            hasSetWidth={true}
            hasTitleOuter={false}
            stylesArray={[styles.whiteTitle, padding.top_8, padding.bottom_1, padding.top_12_small]}
            title={title}
          />
          <div className={css(margin.top_3, margin.top_4_large)}>
            <Translatable content={{ transKey: buttonText }}>
              <StyledButton
                buttonColor="whiteNoBorder"
                buttonStyle="updated"
                href={buttonHref}
              />
            </Translatable>
          </div>
        </Section>
      </div>
    </SectionInner>
  </div>
);

export default InfoBanner;
