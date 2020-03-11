import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ColumnContent from '@src/components/concrete/Dashboard/Columns/ColumnContent';
import ColumnHeader from '@src/components/concrete/Dashboard/Columns/ColumnHeader';
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import { PaymentsPayouts } from '@src/components/concrete/Icons/svgs';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';
import { notifications } from '@src/data/dashboard/notifications';

const Notifications = () => (
  <DashboardTemplate>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.notifications}
      sideBar={
        <SidebarSimple
          icon={<PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
          text="dashboard.payments_box_description"
          title="dashboard.payments_box_title"
        />
      }
      title="dashboard.notifications_personal_title"
    >
      <div>
        <div>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, padding.leftright_1)}>
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
              <div className={css(margin.topbottom_2)}>
                <ListItem
                  subtitle="dashboard.notifications_subtitle"
                  title="dashboard.notifications_unsubscribe"
                  toggleId="marketing_subscribe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  </DashboardTemplate>
);

export default Notifications;
