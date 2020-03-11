/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { AccountSettings, EmployeeAccess, PaymentSettings, PrivacyAndSharing } from '@src/components/concrete/Icons/svgs';
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import BusinessWrapper from '@src/components/concrete/Business/BusinessWrapper';
import AddInfoItem from '@src/components/concrete/Business/BusinessWrapper/AddInfoItem';
import DomainItem from '@src/components/concrete/Business/BusinessWrapper/DomainItem';
import OfficeLocationItem from '@src/components/concrete/Business/BusinessWrapper/OfficeLocationItem';
import PaymentItem from '@src/components/concrete/Business/BusinessWrapper/PaymentItem';
import Subtitle from '@src/components/concrete/Business/BusinessWrapper/Subtitle';
import BusinessItem from '@src/components/concrete/Business/BusinessWrapper/BusinessItem';
import BusinessButtons from '@src/components/concrete/Business/BusinessWrapper/BusinessItem/BusinessButtons';
import BusinessItemFieldWrapper from '@src/components/concrete/Business/BusinessWrapper/BusinessItem/BusinessItemFieldWrapper';
import BusinessItemField from '@src/components/concrete/Business/BusinessWrapper/BusinessItem/BusinessItemFieldWrapper/BusinessItemField';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import Tabs from '@src/components/concrete/Tabs';

// Data
import { breadcrumbs } from '@src/data/business/breadcrumbs';
import { tabs } from '@src/data/business/tabs';
import { countries, employees, settingsFieldData } from '@src/data/business/page';

type State = {
  address: boolean;
  companyInformation: boolean;
  tabIndex: number;
  vat: boolean;
};

class Settings extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      address: false,
      companyInformation: false,
      tabIndex: 0,
      vat: false,
    };
  }

  handleTabChange = (tab: number): void => {
    this.setState({ tabIndex: tab });
  }

  toggleSection = (name: string) => {
    this.setState({ [name]: !this.state[name] } as unknown);
  }

  saveCompanyInfo = () => {
    // console.log("save company info"); // TODO: make this a proper action
  }

  saveAddressInfo = () => {
    // console.log("save address info"); // TODO: make this a proper action
  }

  saveVatInfo = () => {
    // console.log("save vat info"); // TODO: make this a proper action
  }

  openPaymentModal = () => {
    // console.log("open payment modal"); // TODO: make this a proper action
  }

  openDomainModal = () => {
    // console.log("open domain modal"); // TODO: make this a proper action
  }

  render() {
    const { address, companyInformation, tabIndex, vat } = this.state;
    return (
      <DashboardTemplate>
        <BusinessWrapper
          breadcrumbItems={breadcrumbs.settings}
          tabs={
            <Tabs
              handleClick={this.handleTabChange}
              items={tabs.settings}
              tabIndex={tabIndex}
            />
          }
          title="business.company_settings_title"
        >
          {tabIndex === 0 ? (
            <React.Fragment>
              <BusinessItem
                sideBar={
                  <SidebarSimple
                    icon={<AccountSettings stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                    text="business.settings_account_sidebar_text"
                    title="business.settings_display_name"
                  />
                }
              >
                <div className={css(margin.top_6)}>
                  <Subtitle title="business.settings_company_name" />
                  <div>
                    <div className={css(margin.top_3)}>
                      <BusinessItemFieldWrapper collapsed={companyInformation}>
                        <BusinessItemField
                          boldLabel={true}
                          collapsed={companyInformation}
                          id="display_name"
                          label="business.settings_display_name"
                          name="display_name"
                          value={settingsFieldData.display_name}
                        />
                      </BusinessItemFieldWrapper>
                    </div>
                    <div className={css(margin.top_3)}>
                      <BusinessItemFieldWrapper collapsed={companyInformation}>
                        <BusinessItemField
                          boldLabel={true}
                          collapsed={companyInformation}
                          id="legal_name"
                          label="business.settings_legal_name"
                          name="legal_name"
                          value={settingsFieldData.legal_name}
                        />
                      </BusinessItemFieldWrapper>
                    </div>
                    <div className={css(margin.topbottom_3)}>
                      <BusinessItemFieldWrapper collapsed={companyInformation}>
                        <BusinessItemField
                          boldLabel={true}
                          collapsed={companyInformation}
                          id="num_employees"
                          label="business.settings_num_employees"
                          name="num_employees"
                          selectOptions={employees}
                          value={settingsFieldData.num_employees}
                        />
                      </BusinessItemFieldWrapper>
                    </div>
                    <BusinessButtons
                      collapsed={companyInformation}
                      firstButtonEvent={companyInformation ? this.saveCompanyInfo : () => this.toggleSection('companyInformation')}
                      firstButtonText={companyInformation ? 'common.save' : 'common.edit'}
                      {...(companyInformation ? { secondButtonEvent: () => this.toggleSection('companyInformation') } : {})}
                    />
                  </div>
                </div>
              </BusinessItem>
              <BusinessItem>
                <div className={css(margin.top_7)}>
                  <div className={css(margin.bottom_3)}>
                    <Subtitle
                      subtitle="business.settings_billing_subtitle"
                      title="business.settings_billing_title"
                    />
                  </div>
                  <div>
                    <div className={css(pagestyles.row, pagestyles.clearfix)}>
                      <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, padding.leftright_1)}>
                        <BusinessItemFieldWrapper collapsed={address}>
                          <BusinessItemField
                            boldLabel={true}
                            collapsed={address}
                            id="street"
                            label="business.settings_address_1"
                            name="street"
                            value={settingsFieldData.street}
                          />
                        </BusinessItemFieldWrapper>
                      </div>
                    </div>
                    <div className={css(pagestyles.row, pagestyles.clearfix)}>
                      <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, padding.leftright_1)}>
                        <div className={css(margin.top_3)}>
                          <BusinessItemFieldWrapper collapsed={address}>
                            <BusinessItemField
                              boldLabel={true}
                              collapsed={address}
                              id="street_2"
                              label="business.settings_address_2"
                              name="street_2"
                              value={settingsFieldData.street_2}
                            />
                          </BusinessItemFieldWrapper>
                        </div>
                      </div>
                    </div>
                    <div className={css(pagestyles.row, pagestyles.clearfix)}>
                      <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                        <div className={css(margin.top_3)}>
                          <BusinessItemFieldWrapper collapsed={address}>
                            <BusinessItemField
                              boldLabel={true}
                              collapsed={address}
                              id="post_code"
                              label="common.address_postal_code"
                              name="post_code"
                              value={settingsFieldData.post_code}
                            />
                          </BusinessItemFieldWrapper>
                        </div>
                      </div>
                      <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                        <div className={css(margin.top_3)}>
                          <BusinessItemFieldWrapper collapsed={address}>
                            <BusinessItemField
                              boldLabel={true}
                              collapsed={address}
                              id="city"
                              label="common.address_city"
                              name="city"
                              value={settingsFieldData.city}
                            />
                          </BusinessItemFieldWrapper>
                        </div>
                      </div>
                    </div>
                    <div className={css(pagestyles.row, pagestyles.clearfix)}>
                      <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                        <div className={css(margin.topbottom_3)}>
                          <BusinessItemFieldWrapper collapsed={address}>
                            <BusinessItemField
                              boldLabel={true}
                              collapsed={address}
                              id="country"
                              label="common.address_country"
                              name="country"
                              placeholder="GB"
                              selectOptions={countries}
                              value={settingsFieldData.country}
                            />
                          </BusinessItemFieldWrapper>
                        </div>
                      </div>
                      <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                        <div className={css(margin.topbottom_3)}>
                          <BusinessItemFieldWrapper collapsed={address}>
                            <BusinessItemField
                              boldLabel={true}
                              collapsed={address}
                              id="county"
                              label="common.address_county"
                              name="county"
                              value={settingsFieldData.county}
                            />
                          </BusinessItemFieldWrapper>
                        </div>
                      </div>
                      <BusinessButtons
                        collapsed={address}
                        firstButtonEvent={address ? this.saveAddressInfo : () => this.toggleSection('address')}
                        firstButtonText={address ? 'common.save' : 'common.edit'}
                        {...(address ? { secondButtonEvent: () => this.toggleSection('address') } : {})}
                      />
                    </div>
                  </div>
                </div>
              </BusinessItem>
              <BusinessItem
                sideBar={vat ? (
                  <SidebarSimple
                    icon={<PrivacyAndSharing stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                    text="business.settings_vat_sidebar_text"
                    title="business.settings_vat_sidebar_title"
                  />
                ) : (
                  null
                )}
              >
                <div className={css(margin.top_7)}>
                  <Subtitle
                    learnMoreLink="/" // TODO: correct link
                    subtitle="business.settings_vat_subtitle"
                    title="business.settings_vat_title"
                  />
                  <div className={css(margin.topbottom_3)}>
                    <div>
                      <BusinessItemFieldWrapper
                        collapsed={vat}
                        multiField={true}
                      >
                        {vat ? (
                          <div className={css(margin.topbottom_2)}>
                            <StyledInput
                              id="country"
                              label="common.address_country"
                              name="country"
                              selectOptions={countries}
                            />
                            <StyledInput
                              id="vat_number"
                              label="business.settings_vat_title"
                              name="vat_number"
                            />
                            <StyledInput
                              id="registration_name"
                              label="business.settings_vat_registration"
                              name="registration_name"
                            />
                            <StyledInput
                              id="vat_street"
                              label="business.settings_address_1"
                              name="vat_street"
                            />
                            <StyledInput
                              id="vat_street_2"
                              label="business.settings_address_2"
                              name="vat_street_2"
                            />
                            <StyledInput
                              id="city"
                              label="common.address_city"
                              name="city"
                            />
                            <StyledInput
                              id="county"
                              label="common.address_county"
                              name="county"
                            />
                            <StyledInput
                              id="vat_post_code"
                              label="common.address_postal_code"
                              name="vat_post_code"
                            />
                          </div>
                        ) : (
                          null
                        )}
                      </BusinessItemFieldWrapper>
                      <BusinessButtons
                        collapsed={vat}
                        firstButtonEvent={vat ? this.saveVatInfo : () => this.toggleSection('vat')}
                        firstButtonStyle="primary"
                        firstButtonText={vat ? 'business.settings_vat_verify' : 'business.settings_vat_add'}
                        {...(vat ? { secondButtonEvent: () => this.toggleSection('vat') } : {})}
                      />
                    </div>
                  </div>
                </div>
              </BusinessItem>
              <BusinessItem
                sideBar={
                  <SidebarSimple
                    icon={<PrivacyAndSharing stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                    text="business.settings_office_sidebar_text"
                    title="business.settings_office_title"
                  />
                }
              >
                <div className={css(margin.top_5)}>
                  <div className={css(margin.topbottom_3)}>
                    <Subtitle
                      removeWeight={true}
                      subtitle="business.settings_office_subtitle"
                      title="business.settings_office_title"
                    />
                  </div>
                  <OfficeLocationItem />
                </div>
              </BusinessItem>
            </React.Fragment>
          ) : (tabIndex === 1 ? (
            <BusinessItem
              sideBar={
                <SidebarSimple
                  icon={<PaymentSettings stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                  text="business.settings_payment_sidebar_text"
                  title="business.settings_payment_sidebar_title"
                />
              }
            >
              <div className={css(margin.top_6)}>
                <Subtitle
                  needsPadding={true}
                  subtitle="business.settings_payment_subtitle"
                  title="business.settings_payment_title"
                />
                <PaymentItem
                  subtitle="business.settings_payment_item_subtitle"
                  title="business.settings_payment_item_title"
                />
                <AddInfoItem
                  onClick={this.openPaymentModal}
                  text="business.settings_payment_add"
                />
              </div>
            </BusinessItem>
          ) : (tabIndex === 2 ? (
            <BusinessItem
              sideBar={
                <SidebarSimple
                  icon={<EmployeeAccess stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                  text="business.settings_domain_sidebar_text"
                  title="business.settings_domain_sidebar_title"
                />
              }
            >
              <div className={css(margin.top_6)}>
                <Subtitle
                  needsPadding={true}
                  subtitle="business.settings_domain_subtitle"
                  title="business.settings_domain_title"
                />
                <DomainItem
                  peopleCount={settingsFieldData.people_count}
                  text={settingsFieldData.display_name}
                />
                <AddInfoItem
                  onClick={this.openDomainModal}
                  text="business.settings_domain_add"
                />
              </div>
            </BusinessItem>
          ) : (
            null
          )))}
        </BusinessWrapper>
      </DashboardTemplate>
    );
  }
}

export default Settings;
