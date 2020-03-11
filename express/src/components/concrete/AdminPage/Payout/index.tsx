import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import ReportingCard from '@src/components/concrete/ReportingCard';
import PayoutTable from '@src/components/concrete/Tables/PayoutTable';

// Data
import { breadcrumbs } from '@src/data/admin/breadcrumbs';

const Payout = () => (
  <DashboardTemplate bigTable={true}>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.payout}
      title="Payout"
    >
      <div className={css(margin.topbottom_2)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="£20,000"
              text="Total to pay"
            />
            {/* TODO: hardcoded amount */}
          </div>
          <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="£20,000"
              text="Total"
            />
            {/* TODO: hardcoded amount */}
          </div>
          <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="€20,000"
              text="Total to pay"
            />
            {/* TODO: hardcoded amount */}
          </div>
          <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="€20,000"
              text="Total"
            />
            {/* TODO: hardcoded amount */}
          </div>
        </div>
      </div>
      <PayoutTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Payout;
