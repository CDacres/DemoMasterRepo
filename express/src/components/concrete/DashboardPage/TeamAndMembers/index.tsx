import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import Tabs from '@src/components/concrete/Tabs';
import MemberTable from '@src/components/concrete/Tables/MemberTable';
import TeamTable from '@src/components/concrete/Tables/TeamTable';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';
import { tabs } from '@src/data/dashboard/tabs';

type State = {
  tabIndex: number;
};

class TeamAndMembers extends React.Component<{}, State> {
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
          breadcrumbItems={breadcrumbs.team}
          tabs={
            <Tabs
              handleClick={this.handleTabChange}
              items={tabs.team}
              tabIndex={tabIndex}
            />
          }
          title="dashboard.venue_team_members_title"
        >
          <DashboardItem
            firstButtonEvent={this.openPaymentMethods}
            firstButtonText="common.payment_title"
            text="dashboard.payment_add_subtitle"
            title="dashboard.payment_add_title"
          />
          {tabIndex === 0 ? (
            <TeamTable />
          ) : (
            <MemberTable />
          )}
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default TeamAndMembers;
