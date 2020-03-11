import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import LocationTable from '@src/components/concrete/Tables/LocationTable';

// Data
import { breadcrumbs } from '@src/data/admin/breadcrumbs';

const Location = () => (
  <DashboardTemplate fullSize={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.locations}
      title="Locations"
    >
      <LocationTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Location;
