import * as React from 'react';

// Components
import CardMenu from '@src/components/concrete/Dashboard/CardMenu';
import { LoginSecurity, Notifications, PaymentsPayouts, PersonalInfo } from '@src/components/concrete/Icons/svgs';

const VenueMenu = () => {
  const cards = [
    {
      icon: <PersonalInfo />,
      iconSmall: <PersonalInfo isSmall={true} />,
      link: '/venue/listings',
      mobile: true,
      subtitle: 'dashboard.venue_card_listing_subtitle',
      title: 'dashboard.venue_card_listing_title',
    },
    {
      icon: <LoginSecurity />,
      iconSmall: <LoginSecurity isSmall={true} />,
      link: '/venue/reviews',
      mobile: true,
      subtitle: 'dashboard.venue_card_reviews_subtitle',
      title: 'common.reviews_title',
    },
    {
      icon: <PaymentsPayouts />,
      iconSmall: <PaymentsPayouts isSmall={true} />,
      link: '/venue/members',
      mobile: true,
      subtitle: 'dashboard.venue_card_members_subtitle',
      title: 'dashboard.venue_card_members_title',
    },
    {
      icon: <Notifications />,
      iconSmall: <Notifications isSmall={true} />,
      link: '/venue/calendar',
      mobile: true,
      subtitle: 'dashboard.venue_card_calendar_subtitle',
      title: 'dashboard.venue_card_calendar_title',
    },
  ];
  return (
    <CardMenu
      dataItems={cards}
      title="dashboard.venue_card_header"
    />
  );
};

export default VenueMenu;
