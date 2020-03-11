/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import shortid from 'shortid';
import faker from 'faker';

import langObject from '@src/data/langObject';

import { ColorHelper } from '@src/helpers';

import Container from './container';

import { exampleCrumbs, exampleLinks, exampleTags, exampleVerticals } from './data';

import LandingTitle from '@src/components/concrete/LandingTitle';
import SearchBar from '@src/components/concrete/SearchBar';
import Banner from '@src/components/concrete/Banners/Banner';
import Advert from '@src/components/concrete/Banners/Banner/Advert';
import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import CallToAction from '@src/components/concrete/CallToAction';
import Carousel, { LargeOption } from '@src/components/concrete/Carousel';
import HtmlTextBlock from '@src/components/concrete/HtmlTextBlock';
import LinkList from '@src/components/concrete/LinkList';
import SectionHeader from '@src/components/concrete/SectionHeader';
import Breadcrumbs from '@src/components/concrete/Breadcrumbs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { LargeScreen } from '@src/components/abstract/MediaQuery';

const lang = langObject();

const colorHelper = new ColorHelper();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: {
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232'
    },
    domain: 'uk'
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

storiesOf('Pages/landing', module)
  .add('landing', () => {
    const cards = [];
    for (let i = 0; i <= 7; i++) {
      cards.push({
        category: faker.random.word(),
        color: colorHelper.getVerticalColors()[faker.random.number({ max: 9 })],
        currency: '£',
        id: i,
        image: faker.image.abstract(),
        link: faker.internet.url(),
        price: {
          hourly: faker.random.number({ max: 999 })
        },
        rating: (i < 6 ? i - 0.6 : 3),
        reviewsCount: i,
        text: faker.lorem.sentence(),
        title: faker.lorem.words()
      });
    }
    return (
      <Provider store={store}>
        <Container>
          <LandingTitle
            h1="Meeting Rooms in London"
            h2="Hire the best Meeting Rooms London has to offer"
          />
          <SearchBar hasTagInput={false} />
          <Banner
            image={faker.image.abstract()}
            sectionTitle={faker.random.words()}
          >
            <Advert
              buttonText={faker.random.words()}
              link={faker.internet.url()}
              text={faker.lorem.sentence()}
            />
          </Banner>
          <LargeScreen>
            {matches => {
              if (matches) {
                return (
                  <HtmlTextBlock
                    hasLineTop
                    html={faker.lorem.sentence()}
                    hasLineBottom
                  />
                );
              }
              return null;
            }}
          </LargeScreen>
          <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
            <CardsGrid
              footerLink="/s"
              sectionSubtitle="Check our selections of favourite Meeting rooms"
              sectionTitle="Favourite Meeting rooms London"
            >
              {cards.map(card => {
                return (
                  <Card
                    key={shortid.generate()}
                    {...card}
                  >
                    <CardContent {...card}>
                      <CardText
                        with3
                        {...card}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </CardsGrid>
          </Translatable>
          <CallToAction
            imageAltText={faker.random.words()}
            subtitle={faker.random.words()}
            title={faker.random.words()}
          />
          <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
            <CardsGrid
              footerLink="/s"
              sectionSubtitle="Check our selections of popular Meeting rooms"
              sectionTitle="Popular Meeting rooms London"
            >
              {cards.map(card => {
                return (
                  <Card
                    key={shortid.generate()}
                    {...card}
                  >
                    <CardContent {...card}>
                      <CardText
                        with3
                        {...card}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </CardsGrid>
          </Translatable>
          <Carousel
            id="largeCarouselReview"
            isSlider
            linkComponentProps={{ target: '_blank', rel: 'noopener' }}
            options={cards}
            optionTemplate={LargeOption}
            sectionSubtitle="Check out our best reviewed Meeting rooms"
            sectionTitle="Best Reviewed Meeting rooms London"
            type="large"
            with3
          />
          <Carousel
            id="largeCarouselRecent"
            isSlider
            linkComponentProps={{ target: '_blank', rel: 'noopener' }}
            options={cards}
            optionTemplate={LargeOption}
            sectionSubtitle="Check out these recently booked Meeting rooms"
            sectionTitle="Recently Booked Meeting rooms London"
            type="large"
            with3
          />
          <LargeScreen>
            {matches => {
              if (matches) {
                return (
                  <div>
                    <HtmlTextBlock
                      hasLineBottom
                      html={faker.lorem.sentence()}
                      hasLineTop
                    />
                  </div>
                );
              }
              return null;
            }}
          </LargeScreen>
          <React.Fragment>
            <SectionHeader sectionTitle="Related Searches to Meeting rooms London" />
            <LinkList
              columns={3}
              items={exampleLinks.without}
            />
          </React.Fragment>
          <LargeScreen>
            {matches => {
              if (matches) {
                return (
                  <div>
                    <SectionHeader sectionTitle="In and around London" />
                    <LinkList items={exampleLinks.subtitles} />
                  </div>
                );
              }
              return null;
            }}
          </LargeScreen>
          <Breadcrumbs
            items={exampleCrumbs}
            type="landing_page"
          />
        </Container>
      </Provider>
    );
  });
