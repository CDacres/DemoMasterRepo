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

const FullStar = ({ customStyle }: Props) => (
  <span className={css(starStyles.reviewStar, customStyle ? customStyle : null)}>
    <Star stylesArray={[pagestyles.icon, customStyle ? customStyle : null]} />
  </span>
);

export default FullStar;
