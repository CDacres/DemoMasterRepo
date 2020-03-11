import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Point from '@src/components/concrete/Legal/LegalTextSection/Body/Point';

type Props = {
  item: any;
};

const Body = ({ item }: Props) => {
  const renderBody = () => {
    if (typeof item === 'string') {
      return (
        <Translatable content={{ transKey: item }}>
          <p />
        </Translatable>
      );
    } else if (item instanceof Array) {
      return (
        <ul>
          {item.map(point =>
            <Point
              key={shortid.generate()}
              point={point}
            />
          )}
        </ul>
      );
    } else if (item instanceof Object) {
      return (
        <p>
          <Translatable
            attributes={{ href: { transKey: item.a } }}
            content={{ transKey: item.text }}
          >
            <a className={css(pagestyles.link)} />
          </Translatable>
        </p>
      );
    }
  };
  return renderBody();
};

export default Body;
