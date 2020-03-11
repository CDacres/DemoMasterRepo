import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

// Components
import Place from '@src/components/concrete/Product/RoomLocation/Places/Place';

// Types
import { RoomLocationPlace } from '@src/typings/types';

type Props = {
  around: RoomLocationPlace[];
  firstLocKey: number;
  secondLocKey: number;
};

const Places = ({ around, firstLocKey, secondLocKey }: Props) => (
  <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
    {around[firstLocKey] &&
      <Place place={around[firstLocKey]} />
    }
    {around[secondLocKey] &&
      <Place place={around[secondLocKey]} />
    }
  </div>
);

export default Places;
