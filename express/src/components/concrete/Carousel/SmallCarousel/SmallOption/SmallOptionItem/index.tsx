/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import smallOptionStyles from '../styles';
import carouselStyles from '../../../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const SmallOptionItem = ({ image, link, linkComponent, linkComponentProps, maxOptions, subtitle, text }: CarouselOptionProps) => {
  const BrowserLink = linkComponent;
  const optionWidth = maxOptions.small === 6 ? smallOptionStyles.optionWidth6 : maxOptions.small === 4 ? smallOptionStyles.optionWidth4 : maxOptions.small === 3 ? smallOptionStyles.optionWidth3 : smallOptionStyles.optionWidth5;
  return (
    <div className={css(carouselStyles.carouselWrapper, optionWidth)}>
      <div className={css(carouselStyles.carouselOptionContainerInner, padding.leftright_0_75, padding.leftright_1_small, padding.bottom_0_large)}>
        <BrowserLink
          aria-busy="false"
          className={css(pagestyles.link, smallOptionStyles.smallOptionLink)}
          href={link}
          {...linkComponentProps}
        >
          <div className={css(smallOptionStyles.smallOption, margin.bottom_0_5, padding.all_0)}>
            <div className={css(smallOptionStyles.smallOptionTable)}>
              <div className={css(pagestyles.tableCellMiddle)}>
                <div className={css(smallOptionStyles.smallOptionImageWrapper)}>
                  <div className={css(smallOptionStyles.smallOptionImageContainer)}>
                    <div
                      className={css(carouselStyles.cardImage, smallOptionStyles.cardImageSmall)}
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                </div>
              </div>
              <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                <div className={css(carouselStyles.optionTextWrapper, subtitle ? [padding.leftright_2, padding.topbottom_1] : smallOptionStyles.smallOptionTextNormal)}>
                  <div className={css(smallOptionStyles.smallOptionTextContainer, pagestyles.middleText, pagestyles.fontBlack, margin.all_0)}>
                    <span className={css(smallOptionStyles.smallOptionTextInner, pagestyles.textMap, subtitle ? smallOptionStyles.smallOptionTextSizeSubtitle : smallOptionStyles.smallOptionTextSizeNormal)}>
                      {text}
                    </span>
                  </div>
                  {subtitle &&
                    <span className={css(smallOptionStyles.smallOptionSubtitleWrapper, pagestyles.smallSubtitle, pagestyles.fontMedium, margin.all_0)}>
                      <span className={css(pagestyles.inlineBlock, margin.top_0_5)}>
                        {subtitle}
                      </span>
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </BrowserLink>
      </div>
    </div>
  );
};

export default SmallOptionItem;
