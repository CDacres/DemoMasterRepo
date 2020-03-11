import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';

// Data
import { breadcrumbs } from '@src/data/admin/breadcrumbs';
import { dataStudioLink } from '@src/data/admin/page';

const DataStudio = () => (
  <DashboardTemplate fullSize={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.data_studio}
      title="Data Studio"
    >
      <iframe
        className={css(pagestyles.noBorder)}
        width="600"
        height="700"
        src={dataStudioLink}
      />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default DataStudio;
