import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import starStyles from '../styles';
import { pagestyles } from '@src/styles';

// Components
import { Star } from '@src/components/concrete/Icons/svgs';

type Props = {
  customStyle?: object;
  onClick?: () => void;
};

const EmptyStar = ({ customStyle, onClick }: Props) => (
  <span
    className={css(starStyles.reviewStar, starStyles.reviewStarInverse, customStyle ? customStyle : null)}
    onClick={onClick}
  >
    <Star stylesArray={[pagestyles.icon, customStyle ? customStyle : null]} />
  </span>
);

export default EmptyStar;
