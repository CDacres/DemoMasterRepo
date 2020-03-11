import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import PackagesCard from '@src/components/concrete/PackagesCard';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Types
import { Package } from '@src/typings/types';

export type RoomPriceAndPackagesProps = {
  options: Package[];
  title?: string;
};

const RoomPriceAndPackages = ({ options, title }: RoomPriceAndPackagesProps) => (
  <React.Fragment>
    {(options && options.length > 0) &&
      <section id="pricing">
        <div className={css(margin.bottom_2)}>
          <GenericHeader text={title ? title : 'room.prices_and_packages'} />
        </div>
        {options && options.map((item, index) => (
          <PackagesCard
            item={item}
            key={index}
          />
        ))}
        <ContentSeparator marginNum={4} />
      </section>
    }
  </React.Fragment>
);

export default RoomPriceAndPackages;
