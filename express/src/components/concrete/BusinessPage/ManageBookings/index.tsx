import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import BusinessBookingTable from '@src/components/concrete/Tables/BusinessBookingTable';

// Data
import { breadcrumbs } from '@src/data/business/breadcrumbs';

const ManageBookings = () => (
  <DashboardTemplate smallOnBigScreen={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.bookings}
      title="business.team_bookings_title"
    >
      <DashboardItem text="business.team_bookings_text" />
      <BusinessBookingTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default ManageBookings;
