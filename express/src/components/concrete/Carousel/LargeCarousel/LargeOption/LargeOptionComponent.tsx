/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import carouselStyles from '../../styles';

// Components
import LargeOptionItem from '@src/components/concrete/Carousel/LargeCarousel/LargeOption/LargeOptionItem';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const LargeOptionComponent = ({ badge, category, color, currency, currentlyShown, image, imageAdjustments, imageText, imageTextColor, lazyLoadImages, link, linkComponent, linkComponentProps, maxOptions, price, rating, reviewsCount, text, title, verticalId, with3 }: CarouselOptionProps) => (
  <React.Fragment>
    {isMobile.any ? (
      <LargeOptionItem
        badge={badge}
        category={category}
        color={color}
        currency={currency}
        image={image}
        imageAdjustments={imageAdjustments}
        imageText={imageText}
        imageTextColor={imageTextColor}
        lazyLoadImages={lazyLoadImages}
        link={link}
        linkComponent={linkComponent}
        linkComponentProps={linkComponentProps}
        maxOptions={maxOptions}
        price={price}
        rating={rating}
        reviewsCount={reviewsCount}
        text={text}
        title={title}
        verticalId={verticalId}
        with3={with3}
      />
    ) : (
      <span {...(!currentlyShown ? { className: css(carouselStyles.hiddenCarousel) } : {})}>
        <LargeOptionItem
          badge={badge}
          category={category}
          color={color}
          currency={currency}
          image={image}
          imageAdjustments={imageAdjustments}
          imageText={imageText}
          imageTextColor={imageTextColor}
          lazyLoadImages={lazyLoadImages}
          link={link}
          linkComponent={linkComponent}
          linkComponentProps={linkComponentProps}
          maxOptions={maxOptions}
          price={price}
          rating={rating}
          reviewsCount={reviewsCount}
          text={text}
          title={title}
          verticalId={verticalId}
          with3={with3}
        />
      </span>
    )}
  </React.Fragment>
);

export default LargeOptionComponent;
