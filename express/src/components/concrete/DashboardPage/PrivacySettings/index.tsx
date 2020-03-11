import * as React from 'react';

// Styles
import { pagestyles } from '@src/styles';

// Components
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import { PrivacyAndSharing } from '@src/components/concrete/Icons/svgs';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';

const PrivacySettings = () => (
  <DashboardTemplate>
    <DashboardWrapper
      breadcrumbItems={breadcrumbs.privacy}
      sideBar={
        <SidebarSimple
          icon={<PrivacyAndSharing stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
          text="dashboard.privacy_info_box_description"
          title="dashboard.privacy_info_box_title"
        />
      }
      title="dashboard.account_card_privacy_title"
    >
      <ListItem
        subtitle="dashboard.privacy_setting_facebook_text"
        title="dashboard.privacy_setting_facebook_title"
        toggleId="facebook_toggle"
      />
      <ListItem
        subtitle="dashboard.privacy_setting_google_text"
        title="dashboard.privacy_setting_google_title"
        toggleId="google_toggle"
      />
    </DashboardWrapper>
  </DashboardTemplate>
);

export default PrivacySettings;
