/* eslint-disable max-len, no-console */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import faker from 'faker';

import langObject from '@src/data/langObject';

import Container from './container';

import Banner from '@src/components/concrete/Banners/Banner';
import Advert from '@src/components/concrete/Banners/Banner/Advert';
import FullBanner from '@src/components/concrete/Banners/FullBanner';
import SearchBanner from '@src/components/concrete/Banners/SearchBanner';
import SearchTrustBanner from '@src/components/concrete/Banners/SearchTrustBanner';
import CallToAction from '@src/components/concrete/CallToAction';
import RoundedBanner from '@src/components/concrete/Banners/RoundedBanner';
import InfoBanner from '@src/components/concrete/Banners/InfoBanner';

const lang = langObject();

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

const action = () => {
  console.log('clicked');
};

storiesOf('Banners', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('advertising banner with button', () => (
    <Banner
      image={faker.image.abstract()}
      sectionTitle="Introducing Zipcube"
    >
      <Advert
        buttonText={faker.random.words()}
        link={faker.internet.url()}
        text={faker.lorem.sentence()}
      />
    </Banner>
  ))
  .add('call to action with button', () => (
    <CallToAction
      action={action}
      buttonText={faker.random.words()}
      image={faker.image.abstract()}
      imageAltText={faker.random.words()}
      subtitle={faker.lorem.sentence()}
      title={faker.random.words()}
    />
  ))
  .add('full banner', () => (
    <FullBanner
      image={faker.image.abstract()}
      subtitle={faker.random.words()}
      title={faker.random.words()}
      url={faker.internet.url()}
      withZipcubeLogo
    />
  ))
  .add('info banner', () => (
    <InfoBanner
      buttonHref="#"
      buttonText="Get started"
      height="100%"
      src="https://a0.muscache.com/pictures/3d9bd982-982a-49e9-9273-9cc3e6b18edd.jpg"
      title="Ready to start hosting?"
      width="100%"
    />
  ))
  .add('rounded banner', () => (
    <RoundedBanner />
  ))
  .add('search banner', () => (
    <SearchBanner
      image={faker.image.abstract()}
      subtitle={faker.random.words()}
      title={faker.random.words()}
      url={faker.internet.url()}
    />
  ))
  .add('search trust banner', () => (
    <SearchTrustBanner sectionTitle="Booking with Zipcube" />
  ));
