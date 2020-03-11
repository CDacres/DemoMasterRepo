/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ColumnContent from '@src/components/concrete/Dashboard/Columns/ColumnContent';
import ColumnHeader from '@src/components/concrete/Dashboard/Columns/ColumnHeader';
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import BusinessWrapper from '@src/components/concrete/Business/BusinessWrapper';
import BusinessItem from '@src/components/concrete/Business/BusinessWrapper/BusinessItem';
import PriceAlertItem from '@src/components/concrete/Business/BusinessWrapper/PriceAlertItem';
import Subtitle from '@src/components/concrete/Business/BusinessWrapper/Subtitle';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import { PaymentsPayouts } from '@src/components/concrete/Icons/svgs';

// Data
import { breadcrumbs } from '@src/data/business/breadcrumbs';
import { notifications } from '@src/data/business/notifications';
import { currencies, frequencyOptions } from '@src/data/business/page';

const Notifications = () => (
  <DashboardTemplate>
    <BusinessWrapper
      breadcrumbItems={breadcrumbs.notifications}
      title="dashboard.notifications_personal_title"
    >
      <BusinessItem
        sideBar={
          <SidebarSimple
            icon={<PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
            text="dashboard.payments_box_description"
            title="dashboard.payments_box_title"
          />
        }
      >
        <div className={css(margin.top_4)}>
          <Subtitle
            subtitle="business.notifications_email_subtitle"
            title="business.notifications_email_title"
          />
        </div>
        <div className={css(margin.top_4)}>
          <div className={css(margin.top_4)}>
            <div className={css(pagestyles.row, pagestyles.clearfix)}>
              <div className={css(pagestyles.column, padding.leftright_1)}>
                <Subtitle
                  smallerTitle={true}
                  subtitle="business.notifications_pending_subtitle"
                  title="business.notifications_pending_title"
                />
                <div className={css(margin.top_3, margin.bottom_1)}>
                  <div className={css(pagestyles.row, pagestyles.clearfix)}>
                    <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, padding.leftright_1)}>
                      <StyledInput
                        id="notifications"
                        label="business.notifications_frequency"
                        name="notifications"
                        selectOptions={frequencyOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css(margin.top_4)}>
            {notifications.map((item, index) => (
              <React.Fragment key={index}>
                <ColumnHeader
                  list={item.header}
                  title={item.name}
                />
                <div>
                  {item.content.map(({ checkboxes, description, title }, itemIndex) => (
                    <ColumnContent
                      description={description}
                      key={itemIndex}
                      list={checkboxes}
                      title={title}
                    />
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
          <PriceAlertItem options={currencies} />
        </div>
      </BusinessItem>
    </BusinessWrapper>
  </DashboardTemplate>
);

export default Notifications;
