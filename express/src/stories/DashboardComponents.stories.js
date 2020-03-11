import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite/no-important';

import langObject from '@src/data/langObject';

import Container from './container';

import Modal from '@src/components/concrete/Modal';
import BulkInvite from '@src/components/concrete/Dashboard/Modals/BulkInvite';
import Payments from '@src/components/concrete/Dashboard/Modals/Payments';
import ReviewInvite from '@src/components/concrete/Dashboard/Modals/ReviewInvite';
import ReviewReply from '@src/components/concrete/Dashboard/Modals/ReviewReply';
import Taxes from '@src/components/concrete/Dashboard/Modals/Taxes';
import TeamAndMembers from '@src/components/concrete/Dashboard/Modals/TeamAndMembers';
import SidebarList from '@src/components/concrete/Dashboard/Sidebar/SidebarList';
import SidebarMultiItem from '@src/components/concrete/Dashboard/Sidebar/SidebarMultiItem';
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import LoginHistory from '@src/components/concrete/Dashboard/DashboardWrapper/SecurityItem/LoginHistory';
import SocialAccount from '@src/components/concrete/Dashboard/DashboardWrapper/SecurityItem/SocialAccount';
import MobileAccountTab from '@src/components/concrete/Dashboard/CardMenu/MenuMobile/MobileAccountTab';
import { Book, PaymentsPayouts, PersonalInfo, SimplifyExpensing } from '@src/components/concrete/Icons/svgs';
import ColumnContent from '@src/components/concrete/Dashboard/Columns/ColumnContent';
import ColumnHeader from '@src/components/concrete/Dashboard/Columns/ColumnHeader';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import PayoutItem from '@src/components/concrete/Dashboard/DashboardWrapper/PayoutItem';
import WorkItem from '@src/components/concrete/Dashboard/DashboardWrapper/WorkItem';
import WidgetItem from '@src/components/concrete/Dashboard/DashboardWrapper/WidgetItem';
import TotalRow from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem/TotalRow';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

import { notifications } from '@src/data/dashboard/notifications';
import { paymentPageData, securityPageData, userInformation } from '@src/data/dashboard/page';
import { sidebar } from '@src/data/dashboard/sidebar';

const lang = langObject();

import { margin, padding, pagestyles } from '@src/styles';

const styles = StyleSheet.create({
  icon: {
    fill: '#00c6ff',
  }
});

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang,
  responsive: {}
});

const somethingHappened = () => {
  console.log('Something Happened');
};

storiesOf('Dashboard Components', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('column layout', () => (
    <Container>
      {notifications.map((item, index) => (
        <div key={index}>
          <ColumnHeader
            list={item.header}
            title={item.name}
          />
          <div>
            {item.content.map(({ checkboxes, description, title }, index) => (
              <ColumnContent
                description={description}
                key={index}
                list={checkboxes}
                title={title}
              />
            ))}
          </div>
        </div>
      ))}
    </Container>
  ))
  .add('generic item', () => (
    <Container>
      <DashboardItem
        text="dashboard.booking_widget_section_subtitle"
        title="dashboard.booking_widget_section_title"
      />
    </Container>
  ))
  .add('list item', () => (
    <Container>
      <ListItem
        buttonText="common.edit"
        item={userInformation.email}
        subtitle="dashboard.personal_info_email_item_subtitle"
        title="users.email_address"
      >
        <div className={css(margin.bottom_3)}>
          <StyledInput
            hiddenLabel
            id="email"
            label="users.email"
            name="email"
            value={userInformation.email}
          />
        </div>
      </ListItem>
    </Container>
  ))
  .add('login and security - device history', () => (
    <Container>
      <LoginHistory
        currentSession
        onLogout={somethingHappened}
        subtitle={securityPageData.login_history_current}
      />
      <LoginHistory
        onLogout={somethingHappened}
        subtitle={securityPageData.login_history_other}
      />
    </Container>
  ))
  .add('login and security - password section', () => (
    <Container>
      <ListItem
        buttonText="common.update"
        formButtonText="common.update_password"
        item={securityPageData.password_last_changed}
        title="users.password"
      >
        <div className={css(margin.bottom_2)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
              <StyledInput
                id="current_password"
                label="users.current_password"
                name="currentPassword"
                type="password"
              />
            </div>
            <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
              <StyledInput
                id="new_password"
                label="users.new_password"
                name="newPassword"
                type="password"
              />
            </div>
            <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
              <StyledInput
                id="confirm_password"
                label="users.confirm_password"
                name="confirmPassword"
                type="password"
              />
            </div>
          </div>
        </div>
      </ListItem>
    </Container>
  ))
  .add('login and security - social account ', () => (
    <Container>
      <SocialAccount
        connected={false}
        label="Facebook"
        onConnect={somethingHappened}
      />
    </Container>
  ))
  .add('mobile tab', () => (
    <Container>
      <MobileAccountTab />
    </Container>
  ))
  .add('modal - bulk invite', () => (
    <Modal>
      <BulkInvite
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ))
  .add('modal - payments', () => (
    <Modal>
      <Payments
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ))
  .add('modal - review reply', () => (
    <Modal>
      <ReviewReply
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
        reviewer={{
          first_name: 'Alice',
          last_name: 'Smith'
        }}
      />
    </Modal>
  ))
  .add('modal - review invite', () => (
    <Modal>
      <ReviewInvite
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ))
  .add('modal - taxes', () => (
    <Modal>
      <Taxes
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ))
  .add('modal - team & members', () => (
    <Modal>
      <TeamAndMembers
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ))
  .add('payout item', () => (
    <Container>
      <PayoutItem
        firstParagraph="dashboard.payouts_first_paragraph"
        secondParagraph="dashboard.payouts_second_paragraph"
        onClick={somethingHappened}
        subtitle="dashboard.payouts_subtitle"
        title="dashboard.payouts_title"
      />
    </Container>
  ))
  .add('sidebar - list', () => (
    <Container>
      <SidebarList
        icon={<Book stylesArray={[styles.icon, pagestyles.icon, pagestyles.icon40]} />}
        items={sidebar}
        title="FAQs"
      />
    </Container>
  ))
  .add('sidebar - multiple items', () => {
    const sidebarMultiItems = [
      {
        description: 'dashboard.work_travel_box_first_description',
        icon: <SimplifyExpensing stylesArray={[pagestyles.icon, pagestyles.icon32, pagestyles.iconYellow]} />,
        title: 'dashboard.work_travel_box_first_title',
      },
      {
        description: 'dashboard.work_travel_box_second_description',
        icon: <PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon32, pagestyles.iconYellow]} />,
        tooltipText: 'dashboard.work_travel_box_pop_up_text',
        title: 'dashboard.work_travel_box_second_title',
      },
    ];
    return (
      <SidebarMultiItem
        buttonDisabled={false}
        items={sidebarMultiItems}
        learnMoreLink="/"
        onClick={somethingHappened}
        popupOpened={false}
        popupText="dashboard.work_travel_box_pop_up_text"
        title="dashboard.work_travel_box_title"
      />
    );
  })
  .add('sidebar - simple', () => (
    <Container>
      <SidebarSimple
        icon={<PersonalInfo stylesArray={[styles.icon, pagestyles.icon, pagestyles.icon40]} />}
        text="dashboard.personal_info_box_description"
        title="dashboard.personal_info_box_title"
      />
    </Container>
  ))
  .add('total row', () => (
    <Container>
      <TotalRow
        text="dashboard.your_coupons"
        total={paymentPageData.coupon_num}
      />
    </Container>
  ))
  .add('work item', () => (
    <Container>
      <WorkItem />
    </Container>
  ))
  .add('widget item', () => (
    <Container>
      <WidgetItem
        domain="uk"
        text="Book meeting rooms"
        token="85af6a156b6bf790102c162783333c13"
      />
    </Container>
  ));
