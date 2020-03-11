/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import carouselStyles from '../styles';
import { margin, padding } from '@src/styles';

// Components
import CardCategory from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardCategory';
import CardTitle from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardTitle';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const XLargeLinkWithImage = ({ badge, category, color, image, link, linkComponent, linkComponentProps, text, title }: CarouselOptionProps) => {
  const BrowserLink = linkComponent;
  return (
    <div className={css(styles.largeOptionContainer, carouselStyles.carouselWrapper)}>
      <div className={css(carouselStyles.carouselOptionContainerInner, padding.leftright_0_75, padding.leftright_1_small, padding.bottom_0_large)}>
        <BrowserLink
          aria-busy="false"
          className={css(carouselStyles.shadedText)}
          href={link}
          {...linkComponentProps}
        >
          <div className={css(margin.bottom_1_25)}>
            <div className={css(carouselStyles.optionImageWithTextContainer)}>
              <div className={css(carouselStyles.cardImageAbsolute)}>
                <div className={css(styles.borderedContainer)}>
                  <div className={css(carouselStyles.cardImageContainer)}>
                    <div
                      aria-label={category}
                      className={css(carouselStyles.cardImage, carouselStyles.cardImageFull)}
                      role="img"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css(padding.top_1)}>
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
            <div className={css(carouselStyles.textWrapper, margin.top_0_25)}>
              <CardText text={text} />
            </div>
          </div>
        </BrowserLink>
      </div>
    </div>
  );
};

export default XLargeLinkWithImage;
