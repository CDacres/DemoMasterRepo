/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import carouselStyles from '../../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { FullScreenModal } from '@src/components/abstract/MediaQuery';
import SmallOptionItem from '@src/components/concrete/Carousel/SmallCarousel/SmallOption/SmallOptionItem';
import OptionBlockItem from '@src/components/concrete/Carousel/OptionBlock/OptionBlockItem';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const SmallOption = ({ currentlyShown, image, isFirst, isLast, link, linkComponent, linkComponentProps, maxOptions, subtitle, text }: CarouselOptionProps) => {
  const BrowserLink = linkComponent;
  return (
    <FullScreenModal>
      {matches => {
        if (matches) {
          return (
            <OptionBlockItem
              isFirst={isFirst}
              isLast={isLast}
            >
              <BrowserLink
                className={css(styles.smallOptionLink, pagestyles.link)}
                href={link}
                {...linkComponentProps}
              >
                <div className={css(styles.smallOption, styles.smallOptionWidthSmallScreen, margin.right_0_5, margin.bottom_0_5, padding.all_0)}>
                  <div className={css(styles.smallOptionImageWrapperSmallScreen)}>
                    <div className={css(styles.smallOptionImageContainerSmallScreen)}>
                      <div className={css(styles.smallOptionImageContainer)}>
                        <div
                          className={css(carouselStyles.cardImage, carouselStyles.cardImageFull)}
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={css(styles.smallOptionTextWrapperSmallScreen, subtitle ? padding.all_2 : styles.smallOptionTextWrapperSmallScreenNormal)}>
                    <div className={css(styles.smallOptionTextContainer, pagestyles.middleText, pagestyles.fontBlack, margin.all_0)}>
                      <span className={css(styles.smallOptionTextInner, pagestyles.textMap)}>
                        {text}
                      </span>
                    </div>
                    {subtitle &&
                      <span className={css(styles.smallOptionSubtitleWrapper, pagestyles.smallSubtitle, pagestyles.fontMedium, margin.all_0)}>
                        <span className={css(pagestyles.block, margin.top_0_75)}>
                          {subtitle}
                        </span>
                      </span>
                    }
                  </div>
                </div>
              </BrowserLink>
            </OptionBlockItem>
          );
        }
        return (
          <React.Fragment>
            {isMobile.any ? (
              <SmallOptionItem
                image={image}
                link={link}
                linkComponent={linkComponent}
                linkComponentProps={linkComponentProps}
                maxOptions={maxOptions}
                subtitle={subtitle}
                text={text}
              />
            ) : (
              <span {...(!currentlyShown ? { className: css(carouselStyles.hiddenCarousel) } : {})}>
                <SmallOptionItem
                  image={image}
                  link={link}
                  linkComponent={linkComponent}
                  linkComponentProps={linkComponentProps}
                  maxOptions={maxOptions}
                  subtitle={subtitle}
                  text={text}
                />
              </span>
            )}
          </React.Fragment>
        );
      }}
    </FullScreenModal>
  );
};

export default SmallOption;
