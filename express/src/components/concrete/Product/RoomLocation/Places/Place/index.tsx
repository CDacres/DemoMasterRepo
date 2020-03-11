import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import roomLocationStyles from '../../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { MapPin } from '@src/components/concrete/Icons/svgs';

// Types
import { RoomLocationPlace } from '@src/typings/types';

type Props = {
  place: RoomLocationPlace;
};

const Places = ({ place }: Props) => (
  <div className={css(margin.bottom_2)}>
    <div className={css(pagestyles.table)}>
      <div className={css(roomLocationStyles.cell, pagestyles.tableCellMiddle)}>
        <div className={css(margin.right_1)}>
          <MapPin stylesArray={[roomLocationStyles.icon]} />
        </div>
      </div>
      <div className={css(roomLocationStyles.cell, pagestyles.tableCellMiddle)}>
        {place.name}
        {' · '}
        {place.distance}
      </div>
    </div>
  </div>
);

export default Places;
