/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import venueStyles from '@src/components/concrete/VenuePage/styles'; // TODO: change this when when venue page is made
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { BottomSidebar, RightSidebar } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Prices from '@src/components/concrete/Prices';
import ReviewItem from '@src/components/concrete/Venue/VenuePageFooter/ReviewItem';
import Avatar from '@src/components/concrete/Avatar';
import StyledButton from '@src/components/concrete/Button/StyledButton';

type Props = {
  currency: string;
  price: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviewsCount?: number;
  src?: string;
  subtitle: string;
  title: string;
};

const VenuePageFooter = ({ currency, price, rating, reviewsCount, subtitle, src, title }: Props) => (
  <div className={css(styles.footerWrapper)}>
    <div className={css(venueStyles.pageInner, padding.leftright_2, padding.topbottom_0_small, padding.leftright_10_small)}>
      <div className={css(styles.footerInner)}>
        <div>
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <div>
                    <span className={css(pagestyles.text, pagestyles.fontBlack, margin.all_0)}>
                      <Prices
                        currency={currency}
                        price={price}
                      />
                    </span>
                  </div>
                );
              }
              return null;
            }}
          </BottomSidebar>
          <div className={css(styles.leftWrapper)}>
            <BottomSidebar>
              {matches => {
                if (matches) {
                  return (
                    <ReviewItem
                      rating={rating}
                      reviewsCount={reviewsCount}
                    />
                  );
                }
                return (
                  <React.Fragment>
                    <div className={css(margin.right_2)}>
                      <Avatar
                        customStyle={styles.avatar}
                        height="48px"
                        needsMargin={false}
                        src={src}
                        width="48px"
                      />
                    </div>
                    <div>
                      <Translatable content={{ transKey: title }}>
                        <div className={css(styles.title, margin.all_0)} />
                      </Translatable>
                      <div className={css(styles.leftWrapper)}>
                        <div className={css(pagestyles.inlineBlock, margin.right_0_5)}>
                          <Translatable content={{ transKey: subtitle }}>
                            <div className={css(pagestyles.smallText, pagestyles.fontBlack, margin.all_0)} />
                          </Translatable>
                        </div>
                        <div className={css(margin.right_0_5)}>
                          <div
                            itemProp="aggregateRating"
                            itemScope={true}
                            itemType="http://schema.org/AggregateRating"
                          >
                            <meta
                              content={rating.toString()}
                              itemProp="ratingValue"
                            />
                            <meta
                              content={reviewsCount.toString()}
                              itemProp="reviewCount"
                            />
                            <ReviewItem
                              rating={rating}
                              reviewsCount={reviewsCount}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
            </BottomSidebar>
          </div>
        </div>
        <div className={css(styles.buttonWrapper, margin.left_0_5)}>
          <RightSidebar>
            {matches => {
              if (matches) {
                return (
                  <div>
                    <div className={css(margin.right_2)}>
                      <span className={css(pagestyles.text, pagestyles.fontBlack, margin.all_0)}>
                        <Prices
                          currency={currency}
                          price={price}
                        />
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          </RightSidebar>
          <div className={css(styles.buttonContainer)}>
            <Translatable content={{ transKey: 'See dates' }}>
              {/* TODO: hardcoded lang */}
              {/* TODO: add action */}
              <StyledButton
                buttonColor="primary"
                buttonStyle="updated"
                customStyle={[styles.footerButton, pagestyles.fullColumn]}
                customSpanStyle={[styles.footerButtonSpan]}
              />
            </Translatable>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default VenuePageFooter;
