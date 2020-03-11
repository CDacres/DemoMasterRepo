/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import VenuePageFooter from '@src/components/concrete/Venue/VenuePageFooter';
import Footer from '@src/components/concrete/Footer';

// Data
import { footer } from '@src/data/venue/footer'; // TODO: hardcoded data

type Props = {
  children: JSX.Element | JSX.Element[];
};

const VenuePageComponent = ({ children }: Props) => (
  <React.Fragment>
    <main className={css(pagestyles.relativePosition)}>
      <div
        itemScope={true}
        itemType="http://schema.org/Product"
      >
        <div className={css(margin.bottom_8, margin.bottom_0_small)}>
          <div className={css(styles.space)} />
          <div className={css(pagestyles.relativePosition)}>
            <div className={css(styles.pageInner, padding.leftright_2, padding.topbottom_0_small, padding.leftright_10_small)}>
              <div className={css(pagestyles.relativePosition)}>
                {children}
              </div>
            </div>
            <VenuePageFooter
              currency={footer.currency}
              price={footer.price}
              rating={footer.rating}
              reviewsCount={footer.reviewsCount}
              src={footer.src}
              subtitle={footer.subtitle}
              title={footer.title}
            />
          </div>
        </div>
      </div>
    </main>
    <div className={css(styles.footer)}>
      <Footer />
    </div>
  </React.Fragment>
);

export default VenuePageComponent;
