import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { Calendar, People } from '@src/components/concrete/Icons/svgs';

type Props = {
  type: 'calendar' | 'people';
};

const DetailIcon = ({ type }: Props) => (
  <div className={css(margin.right_1)}>
    {type === 'people' ? (
      <People stylesArray={[pagestyles.icon, pagestyles.icon20]} />
    ) : (type === 'calendar' ? (
      <Calendar stylesArray={[pagestyles.icon, pagestyles.icon20]} />
    ) : (
      null
    ))}
  </div>
);

export default DetailIcon;
