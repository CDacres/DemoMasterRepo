/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { createStore } from 'redux';

import { exampleTags, exampleVerticals } from './data';
import langObject from '@src/data/langObject';
import { adminInfo, amenities, assetTags, capacityRange, configurations, exclusiveOffer, images, info, name, opening, location, menu, pricePackages, prices, rating, reviews, siblings } from '@src/data/product/meeting';

import Container from './container';

import RoomSummaryInfo from '@src/components/concrete/Product/RoomSummaryInfo';
import RoomHeaderImagesWrapper from '@src/components/concrete/Product/RoomHeaderImagesWrapper';
import RoomAdminCard from '@src/components/concrete/Product/RoomAdminCard';
import RoomAdminTags from '@src/components/concrete/Product/RoomAdminTags';
import RoomHighlightsCard from '@src/components/concrete/Product/RoomHighlightsCard';
import RoomDetails from '@src/components/concrete/Product/RoomDetails';
import RoomExclusiveOffers from '@src/components/concrete/Product/RoomExclusiveOffers';
import RoomMenu from '@src/components/concrete/Product/RoomMenu';
import RoomPriceAndPackages from '@src/components/concrete/Product/RoomPriceAndPackages';
import RoomAmenities from '@src/components/concrete/Product/RoomAmenities';
import RoomLocation from '@src/components/concrete/Product/RoomLocation';
import RoomOpenHoursSchedule from '@src/components/concrete/Product/RoomOpenHoursSchedule';
import RoomReviews from '@src/components/concrete/Product/RoomReviews';
import RoomOtherSpaces from '@src/components/concrete/Product/RoomOtherSpaces';
import Modal from '@src/components/concrete/Modal';
import Report from '@src/components/concrete/Product/Report';
import Share from '@src/components/concrete/Product/Share';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false
    }
  },
  config: {
    domain: 'uk',
    header: {},
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    }
  },
  lang,
  responsive: {}
});

const storeAdmin = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: true,
      isLoggedIn: true
    }
  },
  config: {
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232'
    },
    domain: 'uk',
    header: {},
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    }
  },
  lang,
  responsive: {},
  search: {
    params: { tag: 'meeting-rooms' },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals
  }
});

storiesOf('Product Components', module)
  .add('admin card', () => (
    <Provider store={storeAdmin}>
      <Container>
        <RoomAdminCard
          adminInfo={adminInfo}
          info={info}
        />
      </Container>
    </Provider>
  ))
  .add('amenities', () => (
    <Provider store={store}>
      <Container>
        <RoomAmenities
          amenities={amenities}
          currency={prices.currency}
        />
      </Container>
    </Provider>
  ))
  .add('exclusive offers', () => (
    <Provider store={store}>
      <Container>
        <RoomExclusiveOffers exclusiveOffer={exclusiveOffer} />
      </Container>
    </Provider>
  ))
  .add('header images wrapper', () => (
    <Provider store={store}>
      <Container>
        <RoomHeaderImagesWrapper
          images={images}
          key="header"
          name={name}
          review={reviews.venue_reviews[0]}
          title="common.meeting"
        />
      </Container>
    </Provider>
  ))
  .add('highlights', () => (
    <Provider store={store}>
      <Container>
        <RoomHighlightsCard />
      </Container>
    </Provider>
  ))
  .add('location', () => (
    <Provider store={store}>
      <Container>
        <RoomLocation location={location} />
      </Container>
    </Provider>
  ))
  .add('menu', () => (
    <Provider store={store}>
      <Container>
        <RoomMenu
          currency={prices.currency}
          menu={menu}
        />
      </Container>
    </Provider>
  ))
  .add('modal - report', () => (
    <Provider store={storeAdmin}>
      <Modal large>
        <Report />
      </Modal>
    </Provider>
  ))
  .add('modal - report - inaccurate', () => (
    <Provider store={storeAdmin}>
      <Modal
        hasMobile={false}
        large
      >
        <Report chosenOption="inaccurate" />
      </Modal>
    </Provider>
  ))
  .add('modal - report - offensive', () => (
    <Provider store={storeAdmin}>
      <Modal
        hasMobile={false}
        large
      >
        <Report chosenOption="offensive" />
      </Modal>
    </Provider>
  ))
  .add('modal - report - scam', () => (
    <Provider store={storeAdmin}>
      <Modal
        hasMobile={false}
        large
      >
        <Report chosenOption="scam" />
      </Modal>
    </Provider>
  ))
  .add('modal - report - something else', () => (
    <Provider store={storeAdmin}>
      <Modal
        hasMobile={false}
        large
      >
        <Report chosenOption="other" />
      </Modal>
    </Provider>
  ))
  .add('modal - share', () => (
    <Provider store={storeAdmin}>
      <Modal>
        <Share />
      </Modal>
    </Provider>
  ))
  .add('opening hours', () => (
    <Provider store={store}>
      <Container>
        <RoomOpenHoursSchedule opening={opening} />
      </Container>
    </Provider>
  ))
  .add('other spaces', () => (
    <Provider store={store}>
      <Container>
        <RoomOtherSpaces spaces={siblings} />
      </Container>
    </Provider>
  ))
  .add('price & packages', () => (
    <Provider store={store}>
      <Container>
        <RoomPriceAndPackages
          currency={prices.currency}
          options={pricePackages}
        />
      </Container>
    </Provider>
  ))
  .add('reviews', () => (
    <Provider store={store}>
      <Container>
        <RoomReviews
          per_page={7}
          rating={rating}
          reviews={reviews.venue_reviews}
        />
      </Container>
    </Provider>
  ))
  .add('room details', () => (
    <Provider store={store}>
      <Container>
        <RoomDetails
          configurations={configurations}
          info={info}
        />
      </Container>
    </Provider>
  ))
  .add('room summary info', () => (
    <Provider store={store}>
      <Container>
        <RoomSummaryInfo
          capacity={capacityRange}
          info={info}
          location={location}
          name={name}
          priceRange={prices}
          reviews={rating.count}
          title="common.meeting"
        />
      </Container>
    </Provider>
  ))
  .add('room summary info (admin)', () => (
    <Provider store={storeAdmin}>
      <Container>
        <RoomSummaryInfo
          capacity={capacityRange}
          info={info}
          location={location}
          name={name}
          priceRange={prices}
          reviews={rating.count}
          title="common.meeting"
        />
      </Container>
    </Provider>
  ))
  .add('tags', () => (
    <Provider store={storeAdmin}>
      <Container>
        <RoomAdminTags
          assetTags={assetTags}
          verticalId={info.vertical_id}
        />
      </Container>
    </Provider>
  ));
