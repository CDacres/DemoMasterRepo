/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { Chevron } from '@src/components/concrete/Icons/svgs';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const SmallOptionWithoutImage = ({ subtitle, text }: CarouselOptionProps) => (
  <div className={css(styles.smallOptionNoImageWrapper)}>
    <div className={css(styles.smallOptionNoImageContainer)}>
      <Button
        aria-busy="false"
        stylesArray={[styles.smallOptionNoImage, margin.bottom_0_5, padding.all_0]}
      >
        <div className={css(padding.leftright_3, padding.topbottom_2)}>
          <div className={css(styles.smallOptionTable)}>
            <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
              <div>
                <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)}>
                  <span className={css(styles.smallOptionTextContainer, styles.smallOptionTitleText)}>
                    {text}
                  </span>
                </div>
                <div className={css(margin.top_0_25)}>
                  <div className={css(pagestyles.text, margin.all_0)}>
                    <span className={css(styles.smallOptionTextContainer)}>
                      {subtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={css(pagestyles.tableCellMiddle)}>
              <Chevron
                direction="right"
                stylesArray={[pagestyles.icon]}
              />
            </div>
          </div>
        </div>
      </Button>
    </div>
  </div>
);

export default SmallOptionWithoutImage;
