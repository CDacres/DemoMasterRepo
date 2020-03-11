/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ReviewItem from '@src/components/concrete/Product/RoomReviews/ReviewItem';
import TranslateButton from '@src/components/concrete/Button/TranslateButton';

// Types
import { RoomReviews } from '@src/typings/types';

type Props = {
  addTranslationButton?: boolean;
  isBlock?: boolean;
  isSticky?: boolean;
  isVertical?: boolean;
  rating?: RoomReviews.ReviewRating;
  text: string;
  translateButtonText?: string;
  withRating?: boolean;
};

const SectionHeader = ({ addTranslationButton, isBlock, isSticky, isVertical, rating, text, translateButtonText, withRating }: Props) => (
  <div className={css(styles.headerWrapper, isBlock ? pagestyles.block : styles.flexHeader, isVertical ? [pagestyles.fullColumn, margin.bottom_5] : null)}>
    <div {...(isSticky ? { className: css(styles.stickyContent) } : {})}>
      <div {...(withRating ? { className: css(styles.ratingTitleWrapper) } : {})}>
        <GenericHeader
          stylesArray={[pagestyles.defaultTitle]}
          tag="h1"
        >
          <Translatable content={{ transKey: text }}>
            <div className={css(pagestyles.titleLarge, pagestyles.fontBlack, margin.all_0)} />
          </Translatable>
        </GenericHeader>
      </div>
      {withRating &&
        <ReviewItem rating={rating} />
      }
      {addTranslationButton &&
        <TranslateButton
          buttonText={translateButtonText}
          handleClick={(e) => {
            e.preventDefault();
            // console.log('Page translated');
            // TODO: make this a proper action
          }}
        />
      }
    </div>
  </div>
);

export default SectionHeader;
