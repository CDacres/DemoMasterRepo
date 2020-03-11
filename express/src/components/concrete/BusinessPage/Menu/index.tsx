import * as React from 'react';

// Components
import CardMenu from '@src/components/concrete/Dashboard/CardMenu';
import { LoginSecurity, Notifications, PaymentsPayouts, PersonalInfo, SliderBusiness } from '@src/components/concrete/Icons/svgs';

const Menu = () => {
  const cards = [
    {
      id: 1,
      icon: <PersonalInfo />,
      iconSmall: <PersonalInfo isSmall={true} />,
      link: '/business/manage-booking',
      mobile: false,
      subtitle: 'business.manage_bookings_subtitle',
      title: 'business.team_bookings_title',
    },
    {
      id: 2,
      icon: <LoginSecurity />,
      iconSmall: <LoginSecurity isSmall={true} />,
      link: '/business/people',
      mobile: true,
      mobileOrder: 3,
      subtitle: 'business.people_subtitle',
      title: 'common.people',
    },
    {
      id: 3,
      icon: <PaymentsPayouts />,
      iconSmall: <PaymentsPayouts isSmall={true} />,
      link: '/business/reporting',
      mobile: true,
      mobileOrder: 1,
      subtitle: 'business.reporting_subtitle',
      title: 'business.reporting_title',
    },
    {
      id: 4,
      icon: <Notifications />,
      iconSmall: <Notifications isSmall={true} />,
      link: '/business/notifications',
      mobile: true,
      mobileOrder: 2,
      subtitle: 'business.notifications_subtitle',
      title: 'business.notifications_title',
    },
    {
      id: 5,
      icon: <SliderBusiness />,
      iconSmall: <SliderBusiness isSmall={true} />,
      link: '/business/invoices',
      mobile: false,
      subtitle: 'business.invoices_subtitle',
      title: 'business.invoices_title',
    },
    {
      id: 6,
      icon: <SliderBusiness />,
      iconSmall: <SliderBusiness isSmall={true} />,
      link: '/business/settings',
      mobile: true,
      mobileOrder: 4,
      subtitle: 'business.settings_subtitle',
      title: 'business.settings_title',
    },
  ];
  return (
    <CardMenu
      dataItems={cards}
      title="business.header"
    />
  );
};

export default Menu;
