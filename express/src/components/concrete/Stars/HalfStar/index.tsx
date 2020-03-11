import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import starStyles from '../styles';
import { pagestyles } from '@src/styles';

// Components
import { Star } from '@src/components/concrete/Icons/svgs';

type Props = {
  customStyle?: object;
};

const HalfStar = ({ customStyle }: Props) => (
  <span className={css(starStyles.reviewStar, customStyle ? customStyle : null)}>
    <span className={css(starStyles.reviewStarInverse, starStyles.reviewStarCover)}>
      <Star stylesArray={[pagestyles.icon, customStyle ? customStyle : null]} />
    </span>
    <span className={css(starStyles.reviewStarCover, customStyle ? customStyle : null)}>
      <Star
        inHalf={true}
        stylesArray={[pagestyles.icon, customStyle ? customStyle : null]}
      />
    </span>
  </span>
);

export default HalfStar;
