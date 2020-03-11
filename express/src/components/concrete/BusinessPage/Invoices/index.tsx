import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import ReportingCard from '@src/components/concrete/ReportingCard';
import InvoiceTable from '@src/components/concrete/Tables/InvoiceTable';

// Data
import { breadcrumbs } from '@src/data/business/breadcrumbs';

const Invoices = () => (
  <DashboardTemplate
    bigTable={true}
    smallOnBigScreen={true}
  >
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.invoices}
      title="business.invoices_title"
    >
      <div className={css(margin.topbottom_2)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.column, pagestyles.halfColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="£20,000"
              text="business.current_month"
            />
            {/* TODO: hardcoded amount */}
          </div>
          <div className={css(pagestyles.column, pagestyles.halfColumnSmallScreen, padding.leftright_1)}>
            <ReportingCard
              amount="£20,000"
              isRed={true}
              text="business.amount_due"
            />
            {/* TODO: hardcoded amount */}
          </div>
        </div>
      </div>
      <InvoiceTable />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Invoices;
