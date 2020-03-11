import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import SectionHeader from '@src/components/concrete/SectionHeader';

type Props = {
  children: JSX.Element | JSX.Element[];
  image: string;
  sectionSubtitle?: string;
  sectionTitle?: string;
};

const Banner = ({ children, image, sectionSubtitle, sectionTitle }: Props) => (
  <div className={css(pagestyles.sectionBlockLarge)}>
    {sectionTitle &&
      <SectionHeader
        sectionSubtitle={sectionSubtitle}
        sectionTitle={sectionTitle}
      />
    }
    <span className={css(pagestyles.hideFont)} />
    <div className={css(styles.bannerBodyContainer)}>
      <div className={css(styles.bannerImageContainer)}>
        <div
          className={css(styles.bannerImage)}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'left center',
          }}
        />
      </div>
      <div className={css(styles.bannerDivider)} />
      <div className={css(styles.bannerChildContainer)}>
        {children}
      </div>
    </div>
  </div>
);

export default Banner;
