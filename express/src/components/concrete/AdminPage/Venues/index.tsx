import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import ProgressBar from '@src/components/concrete/Admin/ProgressBar';
import VenueTable from '@src/components/concrete/Tables/VenueTable';

// Data
import { breadcrumbs } from '@src/data/admin/breadcrumbs';
import { progressBar } from '@src/data/admin/progressBar';

const Venues = () => (
  <DashboardTemplate bigTable={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.venues}
      title="Venues"
    >
      <ProgressBar data={progressBar.venue} />
      <VenueTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Venues;
