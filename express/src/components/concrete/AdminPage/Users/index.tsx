import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import UserTable from '@src/components/concrete/Tables/UserTable';

// Data
import { breadcrumbs } from '@src/data/admin/breadcrumbs';

const Users = () => (
  <DashboardTemplate fullSize={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.users}
      title="Users"
    >
      <UserTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Users;
