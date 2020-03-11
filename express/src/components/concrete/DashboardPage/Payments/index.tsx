import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import SidebarList from '@src/components/concrete/Dashboard/Sidebar/SidebarList';
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import PayoutItem from '@src/components/concrete/Dashboard/DashboardWrapper/PayoutItem';
import TotalRow from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem/TotalRow';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import Tabs from '@src/components/concrete/Tabs';
import { Book, PaymentsPayouts } from '@src/components/concrete/Icons/svgs';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';
import { tabs } from '@src/data/dashboard/tabs';
import { paymentPageData } from '@src/data/dashboard/page';
import { sidebar } from '@src/data/dashboard/sidebar';

type State = {
  coupons: boolean;
  giftCard: boolean;
  tabIndex: number;
};

class Payments extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      coupons: false,
      giftCard: false,
      tabIndex: 0,
    };
  }

  handleTabChange = (tab: number): void => {
    this.setState({ tabIndex: tab });
  }

  toggleSection = (name: string) => {
    this.setState({ [name]: !this.state[name] } as unknown);
  }

  openPaymentMethods = () => {
    // console.log("open payment methods"); // TODO: make this a proper action
  }

  redeemGiftCard = () => {
    // console.log("redeem gift card"); // TODO: make this a proper action
  }

  redeemCoupon = () => {
    // console.log("redeem coupon"); // TODO: make this a proper action
  }

  render() {
    const { coupons, giftCard, tabIndex } = this.state;
    return (
      <DashboardTemplate>
        <DashboardWrapper
          breadcrumbItems={breadcrumbs.payments}
          sideBar={
            <React.Fragment>
              {tabIndex === 0 ? (
                <SidebarSimple
                  icon={<PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                  text="dashboard.payments_box_description"
                  title="dashboard.payments_box_title"
                />
              ) : (tabIndex === 1 ? (
                <SidebarList
                  icon={<Book stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                  items={sidebar}
                  title="dashboard.payment_sidebar_faqs"
                />
              ) : (tabIndex === 2 ? (
                <SidebarSimple
                  icon={<Book stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
                  text="dashboard.taxes_box_description"
                  title="dashboard.taxes_box_title"
                />
              ) : (
                null
              )))}
            </React.Fragment>
          }
          tabs={
            <Tabs
              handleClick={this.handleTabChange}
              items={tabs.payments}
              tabIndex={tabIndex}
            />
          }
          title="dashboard.payments_payouts_personal_title"
        >
          <React.Fragment>
            {tabIndex === 0 ? (
              <React.Fragment>
                <DashboardItem
                  firstButtonEvent={this.openPaymentMethods}
                  firstButtonText="common.payment_title"
                  text="dashboard.payment_add_subtitle"
                  title="dashboard.payment_add_title"
                />
                <DashboardItem
                  collapsed={giftCard}
                  collapseItem={
                    <React.Fragment>
                      <StyledInput
                        boldLabel={true}
                        id="gift_card_number"
                        label="dashboard.payment_gift_card"
                        name="gift_card_number"
                      />
                      <div className={css(margin.top_2)}>
                        <StyledInput
                          boldLabel={true}
                          id="pin"
                          label="dashboard.payment_pin"
                          name="pin"
                        />
                      </div>
                    </React.Fragment>
                  }
                  firstButtonEvent={giftCard ? this.redeemGiftCard : () => this.toggleSection('giftCard')}
                  firstButtonText={giftCard ? 'dashboard.redeem_gift_card' : 'dashboard.payment_add_gift_card'}
                  learnMoreLink="/" // TODO: correct link
                  text="dashboard.payment_redeem_subtitle"
                  title="dashboard.payment_redeem_title"
                  {...(giftCard ? { secondButtonEvent: () => this.toggleSection('giftCard') } : {})}
                  {...(giftCard ? { secondButtonText: 'common.cancel' } : {})}
                >
                  <TotalRow
                    text="dashboard.gift_card_balance"
                    total={paymentPageData.gift_card_total}
                  />
                </DashboardItem>
                <DashboardItem
                  collapsed={coupons}
                  collapseItem={
                    <StyledInput
                      boldLabel={true}
                      id="coupon_code"
                      label="dashboard.enter_coupon_code"
                      name="coupon_code"
                    />
                  }
                  firstButtonEvent={coupons ? this.redeemCoupon : () => this.toggleSection('coupons')}
                  firstButtonText={coupons ? 'dashboard.redeem_coupon' : 'dashboard.add_coupon_button'}
                  text="dashboard.add_coupon"
                  title="dashboard.coupons"
                  {...(coupons ? { secondButtonEvent: () => this.toggleSection('coupons') } : {})}
                  {...(coupons ? { secondButtonText: 'common.cancel' } : {})}
                >
                  <TotalRow
                    text="dashboard.your_coupons"
                    total={paymentPageData.coupon_num}
                  />
                </DashboardItem>
              </React.Fragment>
            ) : (tabIndex === 1 ? (
              <PayoutItem
                firstParagraph="dashboard.payouts_first_paragraph"
                secondParagraph="dashboard.payouts_second_paragraph"
                onClick={() => {}} // TODO: make this a proper action
                subtitle="dashboard.payouts_subtitle"
                title="dashboard.payouts_title"
              />
            ) : (tabIndex === 2 ? (
              <DashboardItem
                firstButtonEvent={() => {}} // TODO: make this a proper action
                firstButtonText="dashboard.add_vat_id"
                learnMoreLink="/" // TODO: correct link
                singular={true}
                text="dashboard.taxes_text"
                title="dashboard.taxes_title"
              />
            ) : (
              null
            )))}
          </React.Fragment>
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default Payments;
