import * as React from 'react';

// Components
import PackagesCard from '@src/components/concrete/PackagesCard';

// Types
import { Package } from '@src/typings/types';

type Props = {
  packages: Package[];
};

const SectionPrice = ({ packages }: Props) => (
  <React.Fragment>
    {packages && packages.map((item, index) => (
      <PackagesCard
        item={item}
        key={index}
      />
    ))}
  </React.Fragment>
);

export default SectionPrice;
