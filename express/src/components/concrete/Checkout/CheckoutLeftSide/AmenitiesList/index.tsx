import * as React from 'react';

// Components
import Calculate from '@src/components/concrete/Inputs/Calculate';

type Props = {
  amenities: Array<{
    id: string;
    name: string;
    price: string;
  }>;
};

const AmenitiesList = ({ amenities }: Props) => (
  <React.Fragment>
    {amenities.map(item => (
      <Calculate
        key={item.id}
        label={item.name}
        price={item.price}
        transKey={item.name} // TODO: add transkey for amenity count + name?
      />
    ))}
  </React.Fragment>
);

export default AmenitiesList;
