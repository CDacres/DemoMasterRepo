import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { RightSidebar } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Review from '@src/components/concrete/Checkout/CheckoutRightSide/ProductHeader/Review';

type Props = {
  rating: number;
  reviewsCount: number;
  src: string;
  subtitle: string;
  title: string;
};

const ProductHeader = ({ rating, reviewsCount, src, subtitle, title }: Props) => (
  <div className={css(margin.top_3)}>
    <div>
      <RightSidebar>
        {matches => {
          if (matches) {
            return (
              <div className={css(styles.container)}>
                <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                  <div className={css(margin.top_0_25, margin.bottom_1, margin.right_1)}>
                    <div className={css(pagestyles.text, pagestyles.fontBlack, margin.all_0)}>
                      <Translatable content={{ transKey: title }}>
                        <div />
                      </Translatable>
                    </div>
                  </div>
                  <div className={css(pagestyles.smallText)}>
                    {subtitle}
                  </div>
                  <Review
                    rating={rating}
                    reviewsCount={reviewsCount}
                  />
                </div>
                <div className={css(pagestyles.tableCellMiddle)}>
                  <div className={css(pagestyles.relativePosition, styles.imgContainerLarge)}>
                    <img
                      alt={null}
                      className={css(styles.image)}
                      height="80"
                      src={src}
                      width="100"
                    />
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div>
              <div className={css(pagestyles.relativePosition, styles.imgContainerSmall)}>
                <img
                  alt={null}
                  className={css(styles.image)}
                  height="60"
                  src={src}
                  width="80"
                />
              </div>
              <div className={css(margin.top_2)}>
                <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
                  <Translatable content={{ transKey: title }}>
                    <div />
                  </Translatable>
                </div>
              </div>
              <div className={css(styles.subtitleSmall, pagestyles.smallText)}>
                {subtitle}
              </div>
              <Review
                rating={rating}
                reviewsCount={reviewsCount}
              />
            </div>
          );
        }}
      </RightSidebar>
    </div>
  </div>
);

export default ProductHeader;
