import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import Tabs from '@src/components/concrete/Tabs';
import BusinessPeopleTable from '@src/components/concrete/Tables/BusinessPeopleTable';

// Data
import { breadcrumbs } from '@src/data/business/breadcrumbs';
import { tabs } from '@src/data/business/tabs';

type State = {
  tabIndex: number;
};

class People extends React.Component<{}, State> {
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
      <DashboardTemplate smallOnBigScreen={true}>
        <DashboardWrapper
          breadcrumbItems={breadcrumbs.people}
          tabs={
            <Tabs
              fullScreen={true}
              handleClick={this.handleTabChange}
              items={tabs.people}
              tabIndex={tabIndex}
            />
          }
          title="common.people"
        >
          <DashboardItem
            firstButtonEvent={this.openPaymentMethods}
            firstButtonText="common.payment_title"
            text="business.people_subtitle"
          />
          <BusinessPeopleTable type={tabIndex === 0 ? 'all' : tabIndex === 1 ? 'admin' : 'team'} />
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default People;
