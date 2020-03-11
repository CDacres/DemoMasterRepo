/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import LazyLoad from 'react-lazyload';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import LazyLoadImage from '@src/components/abstract/LazyLoadImage';
import BrowserLink from '@src/components/abstract/Link';

type Props = {
  cardImage: string;
  cardLink: string;
  cardTitle: string;
  lazyLoadImages: boolean;
  newTab: boolean;
};

const CardImage = ({ cardImage, cardLink, cardTitle, lazyLoadImages, newTab }: Props) => (
  <div className={css(styles.cardImage)}>
    <div
      aria-hidden="true"
      className={css(pagestyles.relativePosition)}
    >
      <div>
        <div className={css(styles.cardImagePadder)}>
          <div className={css(styles.cardImageAbsolute)}>
            <BrowserLink
              aria-hidden="true"
              attributes={{ title: { transKey: cardTitle } }}
              href={cardLink}
              rel="noopener"
              tabIndex={-1}
              {...(newTab ? { target: '_blank' } : {})}
            >
              <React.Fragment>
                <span className={css(styles.clippedText)}>
                  {cardTitle}
                </span>
                <div className={css(styles.imageWrapper)}>
                  <div className={css(styles.imageWrapperTransformed)}>
                    <div className={css(styles.imageContainer)}>
                      {lazyLoadImages ? (
                        <LazyLoad
                          height="100%"
                          offset={100}
                          once={true}
                        >
                          <LazyLoadImage src={cardImage}>
                            {src => (
                              <div className={css(styles.cardImageContainer)}>
                                <div
                                  aria-label={cardTitle}
                                  className={css(styles.backgroundImage)}
                                  role="img"
                                  style={{ backgroundImage: `url(${src})` }}
                                />
                              </div>
                            )}
                          </LazyLoadImage>
                        </LazyLoad>
                      ) : (
                        <div className={css(styles.cardImageContainer)}>
                          <div
                            aria-label={cardTitle}
                            className={css(styles.backgroundImage)}
                            role="img"
                            style={{ backgroundImage: `url(${cardImage})` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </BrowserLink>
            <div
              aria-hidden="false"
              className={css(styles.mysteryDiv)}
            >
              <div className={css(styles.mysteryDivInner)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CardImage;
