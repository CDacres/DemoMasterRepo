import * as React from 'react';

// Styles
import { pagestyles } from '@src/styles';

// Connectors
import { useConfig, useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Components
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import WidgetItem from '@src/components/concrete/Dashboard/DashboardWrapper/WidgetItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import { PaymentsPayouts } from '@src/components/concrete/Icons/svgs';

// Types
import { Store } from '@src/typings/types';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';

type Props = {
  config: Store.Config;
  lang: Store.Lang;
};

class Widget extends React.PureComponent<Props> {
  translationHelper = new TranslationHelper({ messages: this.props.lang });

  render() {
    const { config: { domain } } = this.props;
    return (
      <DashboardTemplate>
        <DashboardWrapper
          breadcrumbItems={breadcrumbs.booking_widget}
          sideBar={
            <SidebarSimple
              icon={<PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
              text="dashboard.payments_box_description"
              title="dashboard.payments_box_title"
            />
          }
          title="dashboard.booking_widget_personal_title"
        >
          <DashboardItem
            text="dashboard.booking_widget_section_subtitle"
            title="dashboard.booking_widget_section_title"
          />
          <WidgetItem
            domain={domain}
            text={this.translationHelper.get('dashboard.booking_widget_book_meeting_rooms')}
            token="85af6a156b6bf790102c162783333c13" // TODO: get token from db
          />
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default useConfig(useLang(Widget));
