import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import SidebarMultiItem from '@src/components/concrete/Dashboard/Sidebar/SidebarMultiItem';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import WorkItem from '@src/components/concrete/Dashboard/DashboardWrapper/WorkItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import { PaymentsPayouts, SimplifyExpensing } from '@src/components/concrete/Icons/svgs';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';

const WorkTravel = () => {
  const sidebar = [
    {
      description: 'dashboard.work_travel_box_first_description',
      icon: <SimplifyExpensing stylesArray={[pagestyles.icon, pagestyles.icon32, pagestyles.iconYellow]} />,
      title: 'dashboard.work_travel_box_first_title',
    },
    {
      description: 'dashboard.work_travel_box_second_description',
      icon: <PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon32, pagestyles.iconYellow]} />,
      tooltipText: 'dashboard.work_travel_box_pop_up_text',
      title: 'dashboard.work_travel_box_second_title',
    },
  ];
  return (
    <DashboardTemplate>
      <DashboardWrapper
        breadcrumbItems={breadcrumbs.work_travel}
        sideBar={
          <SidebarMultiItem
            items={sidebar}
            learnMoreLink="/" // TODO: correct link
            title="dashboard.work_travel_box_title"
          />
        }
        title="dashboard.work_travel_card_personal_title"
      >
        <div className={css(margin.bottom_6)}>
          <WorkItem />
        </div>
      </DashboardWrapper>
    </DashboardTemplate>
  );
};

export default WorkTravel;
