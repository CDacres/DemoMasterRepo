/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import CardMenu from '@src/components/concrete/Dashboard/CardMenu';
import { LoginSecurity, Notifications, PaymentsPayouts, PersonalInfo, PrivacySharing, ProfessionalHosting, TravelForWork } from '@src/components/concrete/Icons/svgs';

const AccountMenu = () => {
  const cards = [
    {
      icon: <PersonalInfo />,
      iconSmall: <PersonalInfo isSmall={true} />,
      link: '/account-settings/personal-info',
      mobile: false,
      subtitle: 'dashboard.account_card_personal_subtitle',
      title: 'dashboard.account_card_personal_title',
    },
    {
      icon: <LoginSecurity />,
      iconSmall: <LoginSecurity isSmall={true} />,
      link: '/account-settings/login-settings',
      mobile: true,
      mobileOrder: 3,
      subtitle: 'dashboard.account_card_login_subtitle',
      title: 'dashboard.account_card_login_title',
    },
    {
      icon: <PaymentsPayouts />,
      iconSmall: <PaymentsPayouts isSmall={true} />,
      link: '/account-settings/payments/payment-methods',
      mobile: true,
      mobileOrder: 1,
      subtitle: 'dashboard.account_card_payments_subtitle',
      title: 'dashboard.account_card_payments_title',
    },
    {
      icon: <Notifications />,
      iconSmall: <Notifications isSmall={true} />,
      link: '/account-settings/notifications',
      mobile: true,
      mobileOrder: 2,
      subtitle: 'dashboard.account_card_notifications_subtitle',
      title: 'dashboard.account_card_notifications_title',
    },
    {
      icon: <PrivacySharing />,
      iconSmall: <PrivacySharing isSmall={true} />,
      link: '/account-settings/privacy-and-sharing',
      mobile: false,
      subtitle: 'dashboard.account_card_privacy_subtitle',
      title: 'dashboard.account_card_privacy_title',
    },
    {
      icon: <TravelForWork />,
      iconSmall: <TravelForWork isSmall={true} />,
      link: '/account-settings/payments/zipcube-for-work',
      mobile: true,
      mobileOrder: 4,
      subtitle: 'dashboard.account_card_work_subtitle',
      title: 'dashboard.account_card_work_title',
    },
    {
      icon: <ProfessionalHosting />,
      iconSmall: <ProfessionalHosting isSmall={true} />,
      link: '/account-settings/professional-hosting',
      mobile: true,
      mobileOrder: 5,
      subtitle: 'dashboard.account_card_hosting_subtitle',
      title: 'dashboard.account_card_hosting_title',
    },
  ];
  return (
    <CardMenu
      dataItems={cards}
      title="dashboard.account_settings_header"
    />
  );
};

export default AccountMenu;
