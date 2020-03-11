import * as React from 'react';

// Components
import RoomPrice from '@src/components/concrete/Product/RoomPrice';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

type Props = {
  children?: JSX.Element | JSX.Element[];
  currency: string;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviews?: number;
};

const SidebarTemplate = ({ children, currency, price, rating, reviews }: Props) => (
  <React.Fragment>
    <RoomPrice
      currency={currency}
      price={price}
      rating={rating}
      reviews={reviews}
    />
    {((price && (price.daily || price.hourly || price.monthly)) || (rating && reviews)) &&
      <ContentSeparator marginNum={2} />
    }
    <div>
      {children}
    </div>
  </React.Fragment>
);

export default SidebarTemplate;
