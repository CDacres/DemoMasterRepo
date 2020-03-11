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
import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import HtmlTextBlock from '@src/components/concrete/HtmlTextBlock';
import CallToAction from '@src/components/concrete/CallToAction';
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

storiesOf('Pages/browse', module)
  .add('browse', () => {
    const cards = [];
    for (let i = 0; i <= 11; i++) {
      cards.push({
        category: faker.random.word(),
        color: colorHelper.getVerticalColors()[faker.random.number({ max: 9 })],
        id: i,
        image: faker.image.abstract(),
        link: faker.internet.url(),
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
            h1="Meeting Room Rentals near me"
            h2="Book meeting rooms online. No hidden fees, no contract, best prices."
          />
          <SearchBar hasTagInput={false} />
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
              sectionSubtitle="Book unique meeting venues in the UK"
              sectionTitle="Top 12 meeting room locations we love"
            >
              {cards.map(card => {
                return (
                  <Card
                    cardCount={12}
                    key={shortid.generate()}
                    newTab={false}
                    {...card}
                  >
                    <CardContent
                      newTab={false}
                      {...card}
                    >
                      <CardText {...card} />
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
                    <SectionHeader sectionTitle="Other meeting locations in the UK" />
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
