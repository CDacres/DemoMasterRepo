import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import AddOnsStep from '@src/components/concrete/Checkout/Steps/AddOnsStep';
import PaymentStep from '@src/components/concrete/Checkout/Steps/PaymentStep';
import ReviewStep from '@src/components/concrete/Checkout/Steps/ReviewStep';
import SummaryStep from '@src/components/concrete/Checkout/Steps/SummaryStep';
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import CheckoutRightSide from '@src/components/concrete/Checkout/CheckoutRightSide';
import Content from '@src/components/concrete/Checkout/CheckoutRightSide/Content';
import ProductHeader from '@src/components/concrete/Checkout/CheckoutRightSide/ProductHeader';
import CheckoutPageComponent from '@src/components/concrete/CheckoutPage/CheckoutPageComponent';
import BookingDetails from '@src/components/concrete/Checkout/CheckoutRightSide/Content/BookingDetails';
import ContentItem from '@src/components/concrete/Checkout/CheckoutRightSide/Content/ContentItem';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

// Data
import { sidebarDetails } from '@src/data/checkout/info';

type State = {
  currentPage: number;
  flexibleBooking: boolean;
  flexibleBookingLabel: string;
};

class CheckoutPageContainer extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentPage: 1,
      flexibleBooking: false,
      flexibleBookingLabel: 'checkout.add_flex',
    };
  }

  cancellationClick = () => {
    // TODO: add action for cancellation click
  }

  cancellationDetailsClick = () => {
    // TODO: add action for cancellation details click
  }

  couponClick = () => {
    // TODO: add action for coupon details click
  }

  detailsClick = () => {
    // TODO: add action for mobile section details click
  }

  handlePageChange = (num: number): void => {
    this.setState({ currentPage: num });
  }

  changeLabel = () => {
    if (this.state.flexibleBooking === false) {
      this.setState({ flexibleBookingLabel: 'checkout.add_flex' });
    } else {
      this.setState({ flexibleBookingLabel: 'checkout.remove_flex' });
    }
  }

  handleFlexibleBooking =  () => {
    this.setState({ flexibleBooking: !this.state.flexibleBooking }, this.changeLabel);
  }

  render() {
    const { currentPage, flexibleBooking, flexibleBookingLabel } = this.state;
    return (
      <CheckoutPageComponent>
        {currentPage === 1 &&
          <ReviewStep
            detailsClick={this.detailsClick}
            onClick={() => this.handlePageChange(2)} // TODO: connect up to header state
          />
        }
        {currentPage === 2 &&
          <AddOnsStep
            detailsClick={this.detailsClick}
            onClick={() => this.handlePageChange(3)} // TODO: connect up to header state
          />
        }
        {currentPage === 3 &&
          <PaymentStep
            cancellationClick={this.cancellationClick}
            couponClick={this.couponClick}
            onClick={() => this.handlePageChange(4)} // TODO: connect up to header state
          />
        }
        {currentPage === 4 &&
          <SummaryStep
            id="40124" // TODO: get reservation id from created record
            onClick={() => {}} // TODO: make this a proper action
          />
        }
        <ProductLargeScreen>
          {matches => {
            if (matches) {
              return (
                <CheckoutRightSide>
                  <ProductHeader
                    rating={sidebarDetails.rating}
                    reviewsCount={sidebarDetails.reviewsCount}
                    src={sidebarDetails.image}
                    subtitle={sidebarDetails.subtitle}
                    title={sidebarDetails.title}
                  />
                  <ContentSeparator marginNum={3} />
                  <Content
                    flexibleBooking={flexibleBooking}
                    onClick={this.cancellationDetailsClick}
                    showExtraFee={true}
                  >
                    <BookingDetails
                      endDateTime={sidebarDetails.dateTimes[1].endDateTime}
                      guests={sidebarDetails.guests}
                      startDateTime={sidebarDetails.dateTimes[1].startDateTime}
                    />
                    <ContentSeparator marginNum={3} />
                    <div className={css(margin.bottom_3)}>
                      <ContentItem
                        isFirst={true}
                        price={sidebarDetails.prices[0].price}
                        text={sidebarDetails.prices[0].text}
                      />
                      <ContentItem
                        price={sidebarDetails.prices[1].price}
                        text={sidebarDetails.prices[1].text}
                      />
                      <ContentItem
                        price={sidebarDetails.prices[2].price}
                        text={sidebarDetails.prices[2].text}
                      />
                      <ContentItem
                        isClickable={true}
                        onClick={this.handleFlexibleBooking}
                        text={flexibleBookingLabel}
                        tooltip={true}
                      />
                      <ContentSeparator marginNum={3} />
                      <ContentItem
                        isTotal={true}
                        price={sidebarDetails.prices[3].price}
                        text={sidebarDetails.prices[3].text}
                      />
                    </div>
                  </Content>
                </CheckoutRightSide>
              );
            }
            return null;
          }}
        </ProductLargeScreen>
      </CheckoutPageComponent>
    );
  }
}

export default CheckoutPageContainer;
