/* tslint:disable:quotemark */
import * as React from 'react';

// Components
import { House, Speech, StarSparkle } from '@src/components/concrete/Icons/svgs';
import { RightSidebar } from '@src/components/abstract/MediaQuery';

export const getCitiesData = tag => ({
  de: {
    data: [
      {
        image: '/_express/images/pages/search/cities/de/berlin.jpg',
        link: `/s/${tag}/Berlin--Germany`,
        prefetch: true,
        text: 'Berlin',
      },
      {
        image: '/_express/images/pages/search/cities/de/hamburg.jpg',
        link: `/s/${tag}/Hamburg--Germany`,
        prefetch: true,
        text: 'Hamburg',
      },
      {
        image: '/_express/images/pages/search/cities/de/münchen.jpg',
        link: `/s/${tag}/München--Germany`,
        prefetch: true,
        text: 'München',
      },
      {
        image: '/_express/images/pages/search/cities/de/köln.jpg',
        link: `/s/${tag}/Köln--Germany`,
        prefetch: true,
        text: 'Köln',
      },
      {
        image: '/_express/images/pages/search/cities/de/frankfurt.jpg',
        link: `/s/${tag}/Frankfurt--Germany`,
        prefetch: true,
        text: 'Frankfurt',
      },
      {
        image: '/_express/images/pages/search/cities/de/stuttgart.jpg',
        link: `/s/${tag}/Stuttgart--Germany`,
        prefetch: true,
        text: 'Stuttgart',
      },
      {
        image: '/_express/images/pages/search/cities/de/düsseldorf.jpg',
        link: `/s/${tag}/Düsseldorf--Germany`,
        prefetch: true,
        text: 'Düsseldorf',
      },
      {
        image: '/_express/images/pages/search/cities/de/dortmund.jpg',
        link: `/s/${tag}/Dortmund--Germany`,
        prefetch: true,
        text: 'Dortmund',
      },
      {
        image: '/_express/images/pages/search/cities/de/essen.jpg',
        link: `/s/${tag}/Essen--Germany`,
        prefetch: true,
        text: 'Essen',
      },
    ],
  },
  en: {
    data: [
      {
        image: '/_express/images/pages/search/cities/en/london.jpg',
        link: `/s/${tag}/London--UK`,
        prefetch: true,
        text: 'London',
      },
      {
        image: '/_express/images/pages/search/cities/en/birmingham.jpg',
        link: `/s/${tag}/Birmingham--UK`,
        prefetch: true,
        text: 'Birmingham',
      },
      {
        image: '/_express/images/pages/search/cities/en/manchester.jpg',
        link: `/s/${tag}/Manchester--UK`,
        prefetch: true,
        text: 'Manchester',
      },
      {
        image: '/_express/images/pages/search/cities/en/leeds.jpg',
        link: `/s/${tag}/Leeds--UK`,
        prefetch: true,
        text: 'Leeds',
      },
      {
        image: '/_express/images/pages/search/cities/en/glasgow.jpg',
        link: `/s/${tag}/Glasgow--UK`,
        prefetch: true,
        text: 'Glasgow',
      },
      {
        image: '/_express/images/pages/search/cities/en/edinburgh.jpg',
        link: `/s/${tag}/Edinburgh--UK`,
        prefetch: true,
        text: 'Edinburgh',
      },
      {
        image: '/_express/images/pages/search/cities/en/liverpool.jpg',
        link: `/s/${tag}/Liverpool--UK`,
        prefetch: true,
        text: 'Liverpool',
      },
      {
        image: '/_express/images/pages/search/cities/en/bristol.jpg',
        link: `/s/${tag}/Bristol--UK`,
        prefetch: true,
        text: 'Bristol',
      },
      {
        image: '/_express/images/pages/search/cities/en/cardiff.jpg',
        link: `/s/${tag}/Cardiff--UK`,
        prefetch: true,
        text: 'Cardiff',
      },
      {
        image: '/_express/images/pages/search/cities/en/newcastle.jpg',
        link: `/s/${tag}/Newcastle--UK`,
        prefetch: true,
        text: 'Newcastle',
      },
    ],
  },
  fr: {
    data: [
      {
        image: '/_express/images/pages/search/cities/fr/paris.jpg',
        link: `/s/${tag}/Paris--UK`,
        prefetch: true,
        text: 'Paris',
      },
      {
        image: '/_express/images/pages/search/cities/fr/marseille.jpg',
        link: `/s/${tag}/Marseille--UK`,
        prefetch: true,
        text: 'Marseille',
      },
      {
        image: '/_express/images/pages/search/cities/fr/lyon.jpg',
        link: `/s/${tag}/Lyon--UK`,
        prefetch: true,
        text: 'Lyon',
      },
      {
        image: '/_express/images/pages/search/cities/fr/toulouse.jpg',
        link: `/s/${tag}/Toulouse--UK`,
        prefetch: true,
        text: 'Toulouse',
      },
      {
        image: '/_express/images/pages/search/cities/fr/nice.jpg',
        link: `/s/${tag}/Nice--UK`,
        prefetch: true,
        text: 'Nice',
      },
      {
        image: '/_express/images/pages/search/cities/fr/bordelais.jpg',
        link: `/s/${tag}/Bordelais--UK`,
        prefetch: true,
        text: 'Bordelais',
      },
      {
        image: '/_express/images/pages/search/cities/fr/nantes.jpg',
        link: `/s/${tag}/Nantes--UK`,
        prefetch: true,
        text: 'Nantes',
      },
      {
        image: '/_express/images/pages/search/cities/fr/strasbourg.jpg',
        link: `/s/${tag}/Strasbourg--UK`,
        prefetch: true,
        text: 'Strasbourg',
      },
      {
        image: '/_express/images/pages/search/cities/fr/lille.jpg',
        link: `/s/${tag}/Lille--UK`,
        prefetch: true,
        text: 'Lille',
      },
    ],
  },
});

export const tagSuggestions = [];

export const trustBanner = [
  {
    icon: (
      <RightSidebar>
        {matches => {
          if (matches) {
            return (
              <Speech largeScreen={true} />
            );
          }
          return (
            <Speech />
          );
        }}
      </RightSidebar>
    ),
    text: "Day or night, we're here for you. Talk to our support team from anywhere in the world, any hour of day.",
    title: '24/7 customer support',
  },
  {
    icon: (
      <RightSidebar>
        {matches => {
          if (matches) {
            return (
              <House largeScreen={true} />
            );
          }
          return (
            <House />
          );
        }}
      </RightSidebar>
    ),
    text: 'Guests review their hosts after each stay. All hosts must maintain a minimum rating and our hospitality standards to be on Zipcube.',
    title: 'Global hospitality standards',
  },
  {
    icon: (
      <RightSidebar>
        {matches => {
          if (matches) {
            return (
              <StarSparkle largeScreen={true} />
            );
          }
          return (
            <StarSparkle />
          );
        }}
      </RightSidebar>
    ),
    text: 'From fresh-pressed sheets to tips on where to get the best brunch, our hosts are full of local hospitality.',
    title: '5-star hosts',
  },
];

// TODO: change 'Test subtitle' to something more useful...
export const verticalsData = {
  en: {
    title: 'Explore Zipcube',
    subtitle: 'Book any space any time anywhere',
    data: [
      {
        image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/meeting.jpg',
        link: '/s/meeting',
        prefetch: true,
        subtitle: 'Test subtitle',
        text: 'Meeting',
      },
      {
        image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/office.jpg',
        link: '/s/office-space',
        prefetch: true,
        subtitle: 'Test subtitle',
        text: 'Office',
      },
      {
        image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/party.jpg',
        link: '/s/party-venues',
        prefetch: true,
        subtitle: 'Test subtitle',
        text: 'Party',
      },
      {
        image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/private-dining.jpg',
        link: '/s/private-dining-venues',
        prefetch: true,
        subtitle: 'Test subtitle',
        text: 'Private dining',
      },
      {
        image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/wedding.jpg',
        link: '/s/wedding-venues',
        prefetch: true,
        subtitle: 'Test subtitle',
        text: 'Wedding',
      },
      {
        image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/art-venues.jpg',
        link: '/s/art-venues',
        prefetch: true,
        subtitle: 'Test subtitle',
        text: 'Art venues',
      },
      {
        image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/sport-venues.jpg',
        link: '/s/sport-venues',
        prefetch: true,
        subtitle: 'Test subtitle',
        text: 'Sport venues',
      },
    ],
  },
};
