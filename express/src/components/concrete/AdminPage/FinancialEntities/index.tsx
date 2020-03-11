import * as React from 'react';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import FinancialEntityTable from '@src/components/concrete/Tables/FinancialEntityTable';

// Data
import { breadcrumbs } from '@src/data/admin/breadcrumbs';

const FinancialEntities = () => (
  <DashboardTemplate fullSize={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.entities}
      title="Financial Entities"
    >
      <FinancialEntityTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default FinancialEntities;
