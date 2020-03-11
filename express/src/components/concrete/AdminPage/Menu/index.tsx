/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import CardMenu from '@src/components/concrete/Dashboard/CardMenu';
import { LoginSecurity, Notifications, PaymentsPayouts, PersonalInfo, PrivacySharing, ProfessionalHosting, TravelForWork } from '@src/components/concrete/Icons/svgs';

const Menu = () => {
  const cards = [
    {
      id: 1,
      icon: <PersonalInfo />,
      iconSmall: <PersonalInfo isSmall={true} />,
      link: '/admin/crm',
      mobile: false,
      subtitle: 'Provide personal details and how we can reach you',
      title: 'CRM',
    },
    {
      id: 2,
      icon: <LoginSecurity />,
      iconSmall: <LoginSecurity isSmall={true} />,
      link: '/admin/bookings',
      mobile: true,
      mobileOrder: 3,
      subtitle: 'Update your password and secure your account',
      title: 'Bookings (old)',
    },
    {
      id: 3,
      icon: <PaymentsPayouts />,
      iconSmall: <PaymentsPayouts isSmall={true} />,
      link: '/admin/experiences',
      mobile: true,
      mobileOrder: 1,
      subtitle: 'Review all things money, including coupons, gift cards, and taxes',
      title: 'Experiences (old)',
    },
    {
      id: 4,
      icon: <Notifications />,
      iconSmall: <Notifications isSmall={true} />,
      link: '/admin/performance',
      mobile: true,
      mobileOrder: 2,
      subtitle: 'Choose notification preferences and how you want to be contacted',
      title: 'Performance',
    },
    {
      id: 5,
      icon: <PrivacySharing />,
      iconSmall: <PrivacySharing isSmall={true} />,
      link: '/admin/inventory',
      mobile: false,
      subtitle: 'Control connected apps, what you share, and who sees it',
      title: 'Inventory',
    },
    {
      id: 6,
      icon: <TravelForWork />,
      iconSmall: <TravelForWork isSmall={true} />,
      link: '/admin/users',
      mobile: true,
      mobileOrder: 4,
      subtitle: 'Add a work email for business trip benefits',
      title: 'Users',
    },
    {
      id: 7,
      icon: <ProfessionalHosting />,
      iconSmall: <ProfessionalHosting isSmall={true} />,
      link: '/admin/helpers',
      mobile: true,
      mobileOrder: 5,
      subtitle: 'Get professional tools if you manage several properties on Zipcube',
      title: 'Helpers',
    },
  ];
  return (
    <CardMenu
      dataItems={cards}
      title="common.admin"
    />
  );
};

export default Menu;
