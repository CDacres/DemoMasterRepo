/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import carouselStyles from '../../../styles';
import { margin, padding } from '@src/styles';

// Components
import OptionImageWithText from '@src/components/concrete/Carousel/LargeCarousel/LargeOption/LargeOptionItem/OptionImageWithText';
import ReviewsSection from '@src/components/concrete/ReviewsSection';
import CardCategory from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardCategory';
import CardTitle from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardTitle';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const LargeOptionItem = ({ badge, category, color, currency, image, imageAdjustments, imageText, imageTextColor, lazyLoadImages, link, linkComponent, linkComponentProps, maxOptions, price, rating, reviewsCount, text, title, verticalId, with3 }: CarouselOptionProps) => {
  const BrowserLink = linkComponent;
  const optionWidth = maxOptions.large === 5 ? styles.optionWidth5 : styles.optionWidth3;
  return (
    <div className={css(carouselStyles.carouselWrapper, optionWidth)}>
      <div className={css(carouselStyles.carouselOptionContainerInner, padding.leftright_0_75, padding.leftright_1_small, padding.bottom_0_large)}>
        <BrowserLink
          aria-busy="false"
          className={css(carouselStyles.shadedText)}
          href={link}
          {...linkComponentProps}
        >
          <React.Fragment>
            <div className={css(margin.bottom_1_25)}>
              <OptionImageWithText
                image={image}
                imageAdjustments={imageAdjustments}
                imageText={imageText}
                imageTextColor={imageTextColor}
                lazyLoadImages={lazyLoadImages}
                verticalId={verticalId}
              />
            </div>
            {category &&
              <CardCategory
                badge={badge}
                category={category}
                color={color}
              />
            }
            {title &&
              <CardTitle title={title} />
            }
            <div className={css(margin.bottom_1)}>
              <div className={css(carouselStyles.textWrapper, margin.top_0_25)}>
                <CardText
                  currency={currency}
                  price={price}
                  text={text}
                  with3={with3}
                />
              </div>
              {reviewsCount > 0 &&
                <ReviewsSection
                  rating={rating}
                  reviewsCount={reviewsCount}
                />
              }
            </div>
          </React.Fragment>
        </BrowserLink>
      </div>
    </div>
  );
};

export default LargeOptionItem;
