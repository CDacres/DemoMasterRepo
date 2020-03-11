import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import Tabs from '@src/components/concrete/Tabs';
import UserBookingTable from '@src/components/concrete/Tables/UserBookingTable';
import VenueBookingTable from '@src/components/concrete/Tables/VenueBookingTable';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';
import { tabs } from '@src/data/dashboard/tabs';

type State = {
  tabIndex: number;
};

class Bookings extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  handleTabChange = (tab: number): void => {
    this.setState({ tabIndex: tab });
  }

  openPaymentMethods = () => {
    // console.log("open payment methods"); // TODO: make this a proper action
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <DashboardTemplate>
        <DashboardWrapper
          breadcrumbItems={breadcrumbs.bookings}
          tabs={
            <Tabs
              fullScreen={true}
              handleClick={this.handleTabChange}
              items={tabs.bookings}
              tabIndex={tabIndex}
            />
          }
          title="common.bookings"
        >
          {tabIndex === 0 ? (
            <React.Fragment>
              <DashboardItem
                firstButtonEvent={this.openPaymentMethods}
                firstButtonText="common.payment_title"
                text="dashboard.payment_add_subtitle"
                title="dashboard.payment_add_title"
              />
              <VenueBookingTable />
            </React.Fragment>
          ) : (tabIndex === 1 ? (
            <React.Fragment>
              <DashboardItem
                firstButtonEvent={this.openPaymentMethods}
                firstButtonText="common.payment_title"
                text="dashboard.payment_add_subtitle"
                title="dashboard.payment_add_title"
              />
              <UserBookingTable />
            </React.Fragment>
          ) : (
            null
          ))}
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default Bookings;
