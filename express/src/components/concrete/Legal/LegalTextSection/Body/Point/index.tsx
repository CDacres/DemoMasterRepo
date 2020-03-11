import * as React from 'react';
import shortid from 'shortid';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  point: any;
};

const Point = ({ point }: Props) => {
  const renderPoint = () => {
    if (typeof point === 'string') {
      return (
        <Translatable content={{ transKey: point }}>
          <li />
        </Translatable>
      );
    } else if (point instanceof Array) {
      return (
        <ul>
          {point.map(item =>
            <Point
              key={shortid.generate()}
              point={item}
            />
          )}
        </ul>
      );
    }
  };
  return renderPoint();
};

export default Point;
