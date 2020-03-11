import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import CancellationDetails from '@src/components/concrete/Checkout/CheckoutRightSide/Content/CancellationDetails';
import ContentItem from '@src/components/concrete/Checkout/CheckoutRightSide/Content/ContentItem';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

// Data
import { sidebarDetails } from '@src/data/checkout/info';

type Props = {
  children: JSX.Element[];
  flexibleBooking: boolean;
  onClick: () => void;
  showExtraFee?: boolean;
};

const Content = ({ children, flexibleBooking, onClick, showExtraFee }: Props) => (
  <div className={css(styles.wrapper)}>
    {children}
    <ContentSeparator marginNum={3} />
    {showExtraFee &&
      <React.Fragment>
        <div className={css(margin.bottom_3)}>
          <ContentItem
            isFirst={true}
            price={sidebarDetails.prices[4].price}
            text={sidebarDetails.prices[4].text}
          />
          <ContentItem
            price={sidebarDetails.prices[5].price}
            text={sidebarDetails.prices[5].text}
          />
          <ContentItem
            price={sidebarDetails.prices[6].price}
            text={sidebarDetails.prices[6].text}
          />
          <ContentItem
            isTotal={true}
            price={sidebarDetails.prices[7].price}
            text={sidebarDetails.prices[7].text}
          />
          <ContentItem
            price={sidebarDetails.prices[8].price}
            text={sidebarDetails.prices[8].text}
          />
          <ContentItem
            price={sidebarDetails.prices[9].price}
            text={sidebarDetails.prices[9].text}
            tooltip={true}
          />
          <ContentItem
            price={sidebarDetails.prices[10].price}
            text={sidebarDetails.prices[10].text}
          />
          <ContentItem
            isTotal={true}
            price={sidebarDetails.prices[11].price}
            text={sidebarDetails.prices[11].text}
          />
        </div>
        <ContentSeparator marginNum={3} />
      </React.Fragment>
    }
    {flexibleBooking ? (
      <CancellationDetails
        description={sidebarDetails.cancellation.flexible.description}
        onClick={onClick}
        title={sidebarDetails.cancellation.flexible.title}
      />
    ) : (
      <CancellationDetails
        description={sidebarDetails.cancellation.nonFlexible.description}
        onClick={onClick}
        title={sidebarDetails.cancellation.nonFlexible.title}
      />
    )}
  </div>
);

export default Content;
