import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import ReportingCard from '@src/components/concrete/ReportingCard';
import ReportTable from '@src/components/concrete/Tables/ReportTable';

// Data
import { breadcrumbs } from '@src/data/business/breadcrumbs';

const Report = () => (
  <DashboardTemplate
    bigTable={true}
    smallOnBigScreen={true}
  >
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.report}
      title="business.reporting_title"
    >
      <div className={css(margin.topbottom_2)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.column, pagestyles.thirdColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="20"
              text="common.bookings"
            />
            {/* TODO: hardcoded amount */}
          </div>
          <div className={css(pagestyles.column, pagestyles.thirdColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="£20,000"
              text="business.reporting_total_title"
            />
            {/* TODO: hardcoded amount */}
          </div>
          <div className={css(pagestyles.column, pagestyles.thirdColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="€1,000"
              text="business.reporting_average_title"
            />
            {/* TODO: hardcoded amount */}
          </div>
        </div>
      </div>
      <ReportTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Report;
