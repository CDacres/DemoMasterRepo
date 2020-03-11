import * as React from 'react';
import { css } from 'aphrodite/no-important';
import ReactTelInput from 'react-telephone-input';

// Connectors
import { useConfig } from '@src/store/connectors';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import { PersonalInfo as PersonalInfoIcon } from '@src/components/concrete/Icons/svgs';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';
import { userInformation } from '@src/data/dashboard/page';

const PersonalInfo = (props) => {
  const { config: { countryCode } } = props;
  return (
    <DashboardTemplate>
      <DashboardWrapper
        breadcrumbItems={breadcrumbs.menu_list}
        sideBar={
          <SidebarSimple
            icon={<PersonalInfoIcon stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
            text="dashboard.personal_info_box_description"
            title="dashboard.personal_info_box_title"
          />
        }
        title="dashboard.account_card_personal_title"
      >
        <div className={css(margin.bottom_6)}>
          <ListItem
            buttonText="common.edit"
            item={`${userInformation.firstName} ${userInformation.lastName}`}
            subtitle="dashboard.personal_info_name_item_subtitle"
            title="dashboard.personal_info_name_item_title"
          >
            <div className={css(margin.bottom_2)}>
              <div className={css(pagestyles.row, pagestyles.clearfix)}>
                <div className={css(pagestyles.column, pagestyles.halfColumnSmallScreen, padding.leftright_1)}>
                  <StyledInput
                    id="first_name"
                    label="users.first_name"
                    name="first_name"
                    value={userInformation.firstName}
                  />
                </div>
                <div className={css(pagestyles.column, pagestyles.halfColumnSmallScreen, padding.leftright_1)}>
                  <StyledInput
                    id="last_name"
                    label="users.last_name"
                    name="last_name"
                    value={userInformation.lastName}
                  />
                </div>
              </div>
            </div>
          </ListItem>
          <ListItem
            buttonText="common.edit"
            item={userInformation.email}
            subtitle="dashboard.personal_info_email_item_subtitle"
            title="users.email_address"
          >
            <div className={css(margin.bottom_3)}>
              <StyledInput
                hiddenLabel={true}
                id="email"
                label="users.email"
                name="email"
                value={userInformation.email}
              />
            </div>
          </ListItem>
          <ListItem
            buttonText="common.edit"
            item={userInformation.phone}
            subtitle="dashboard.personal_info_phone_item_subtitle"
            title="users.phone_number"
          >
            <div className={css(margin.bottom_3)}>
              <StyledInput
                id="phone_number"
                label="users.phone_number"
                name="phone_number"
              >
                <ReactTelInput
                  defaultCountry={countryCode}
                  flagsImagePath="/_express/images/utils/flags.png"
                  id="phone_number"
                  name="phone_number"
                  onChange={() => {}} // TODO: make this a proper action
                  value=""
                />
              </StyledInput>
            </div>
          </ListItem>
        </div>
      </DashboardWrapper>
    </DashboardTemplate>
  );
};

export default useConfig(PersonalInfo);
