import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import gridStyles from '../styles';
import { padding, pagestyles } from '@src/styles';

// Components
import SectionHeader from '@src/components/concrete/SectionHeader';
import CardsGridFooter from '@src/components/concrete/Grid/CardsGrid/CardsGridFooter';

type Props = {
  children: JSX.Element[];
  footerLink?: string;
  footerText?: string;
  sectionSubtitle?: string;
  sectionTitle?: string;
};

const CardsGrid = ({ children, footerLink, footerText, sectionSubtitle, sectionTitle }: Props) => (
  <div>
    <div>
      <div className={css(pagestyles.sectionBlockLarge)}>
        <SectionHeader
          sectionSubtitle={sectionSubtitle}
          sectionTitle={sectionTitle}
        />
        <span className={css(pagestyles.hideFont)} />
        <div>
          <div className={css(gridStyles.cardsContainer, padding.all_0_large)}>
            {children}
          </div>
        </div>
        {!!footerText &&
          <CardsGridFooter
            link={footerLink}
            text={footerText}
          />
        }
      </div>
    </div>
  </div>
);

export default CardsGrid;
