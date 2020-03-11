import * as React from 'react';

// Styles
import { pagestyles } from '@src/styles';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import ProgressBar from '@src/components/concrete/Admin/ProgressBar';
import SpaceTable from '@src/components/concrete/Tables/SpaceTable';

// Data
import { breadcrumbs } from '@src/data/admin/breadcrumbs';
import { progressBar } from '@src/data/admin/progressBar';

const Spaces = () => (
  <DashboardTemplate bigTable={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.spaces}
      title="Spaces"
    >
      <ProgressBar
        customStyle={pagestyles.quarterColumn}
        data={progressBar.space}
      />
      <SpaceTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Spaces;
