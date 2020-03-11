import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import faker from 'faker';

import Container from './container';

import langObject from '@src/data/langObject';

import Link from '@src/components/abstract/Link';
import Carousel, { LargeImageOption, LargeOption, SmallOption, SmallOptionWithoutImage, XLargeLinkWithImage } from '@src/components/concrete/Carousel';

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

storiesOf('Carousels', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('extra large options', () => {
    const options = [];
    for (let i = 0; i <= 6; i += 1) {
      options.push({
        category: faker.random.words(),
        image: faker.image.abstract(),
        imageText: faker.random.word(),
        link: faker.internet.url(),
        text: faker.lorem.sentence(),
        title: faker.random.words()
      });
    }
    return (
      <Carousel
        id="extraLargeOptions"
        linkComponent={Link}
        options={options}
        optionTemplate={XLargeLinkWithImage}
        sectionTitle="Experiences in the spotlight"
        type="large"
      />
    );
  })
  .add('large carousel', () => {
    const colours = ['maroon', 'orange', 'yellow'];
    const options = [];
    for (let i = 0; i <= 6; i += 1) {
      const lineColour = colours[Math.floor(Math.random() * colours.length)];
      options.push({
        category: faker.random.words(),
        color: lineColour,
        image: faker.image.abstract(),
        imageText: faker.random.word(),
        link: faker.internet.url(),
        rating: (i < 6 ? i - 0.6 : 3),
        reviewsCount: i,
        text: faker.lorem.sentence(),
        title: faker.random.words()
      });
    }
    return (
      <Carousel
        id="largeCarousel"
        isSlider
        lazyLoadImages
        linkComponent={Link}
        options={options}
        optionTemplate={LargeOption}
        sectionSubtitle="A new selection of spaces verified for quality & comfort"
        sectionTitle="Find venues, meeting rooms, offices"
        type="large"
      />
    );
  })
  .add('large image carousel (with one image)', () => {
    const options = [];
    for (let i = 0; i <= 6; i += 1) {
      options.push({
        image: faker.image.abstract(),
        link: faker.url,
        text: faker.lorem.sentence(),
        title: faker.random.words()
      });
    }
    return (
      <Carousel
        id="largeImageCarousel"
        isSlider
        linkComponent={Link}
        options={options}
        optionTemplate={LargeImageOption}
        sectionTitle="Uniquely Zipcube"
        type="largeimage"
      />
    );
  })
  .add('large image carousel (with one small image - tall)', () => {
    const options = [];
    for (let i = 0; i <= 10; i += 1) {
      options.push({
        image: faker.image.abstract(),
        link: faker.url,
        title: faker.random.words()
      });
    }
    return (
      <Carousel
        id="largeImageCarousel"
        isSlider
        linkComponent={Link}
        maxOptions={{ large: 8 }}
        options={options}
        optionTemplate={LargeImageOption}
        sectionTitle="Uniquely Zipcube"
        type="largeimage"
      />
    );
  })
  .add('large image carousel (with one small image - squat)', () => {
    const options = [];
    for (let i = 0; i <= 10; i += 1) {
      options.push({
        image: faker.image.abstract(),
        link: faker.url,
        title: faker.random.words()
      });
    }
    return (
      <Carousel
        id="largeImageCarousel"
        isSlider
        linkComponent={Link}
        maxOptions={{ large: 7 }}
        options={options}
        optionTemplate={LargeImageOption}
        sectionTitle="Uniquely Zipcube"
        type="largeimage"
      />
    );
  })
  .add('large image carousel (with three images)', () => {
    const options = [];
    for (let i = 0; i <= 6; i += 1) {
      options.push({
        images: {
          bottom: faker.image.abstract(),
          main: faker.image.abstract(),
          top: faker.image.abstract()
        },
        link: faker.url,
        text: faker.lorem.sentence(),
        title: faker.random.words()
      });
    }
    return (
      <Carousel
        id="largeImageCarousel"
        isSlider
        linkComponent={Link}
        options={options}
        optionTemplate={LargeImageOption}
        sectionTitle="Uniquely Zipcube"
        threeImg
        type="largeimage"
      />
    );
  })
  .add('small carousel', () => {
    const options = [];
    for (let i = 0; i <= 6; i += 1) {
      options.push({
        image: faker.image.abstract(),
        link: faker.url,
        text: faker.random.word().split(' ')[0]
      });
    }
    return (
      <Carousel
        id="smallCarousel"
        isSlider
        linkComponent={Link}
        options={options}
        optionTemplate={SmallOption}
        sectionSubtitle="Book unique venues in London"
        sectionTitle="Spaces and venues we love in London"
      />
    );
  })
  .add('small carousel without image', () => {
    const options = [];
    for (let i = 0; i <= 6; i += 1) {
      options.push({
        link: faker.url,
        text: faker.random.word().split(' ')[0]
      });
    }
    return (
      <Carousel
        id="smallCarouselWithoutImage"
        isSlider
        linkComponent={Link}
        options={options}
        optionTemplate={SmallOptionWithoutImage}
        sectionTitle="Continue your search"
      />
    );
  });
