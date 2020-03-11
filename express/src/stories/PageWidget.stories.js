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

import FullBanner from '@src/components/concrete/Banners/FullBanner';
import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

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
  responsive: {}
});

storiesOf('Pages/widget', module)
  .add('widget', () => {
    const cards = [];
    for (let i = 0; i <= 14; i++) {
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
          <FullBanner
            image={faker.image.abstract()}
            subtitle={faker.random.words()}
            title={faker.random.words()}
            url={faker.internet.url()}
            withZipcubeLogo
          />
          <div>
            <div>
              <Translatable content={{ transKey: 'widget.page_info', count: 1, replacements: { company_name: faker.random.words() } }} />
            </div>
            <ContentSeparator marginNum={3} />
            <div id="scroll">
              <CardsGrid>
                {cards.map(card => {
                  return (
                    <Card
                      cardCount="all"
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
            </div>
          </div>
        </Container>
      </Provider>
    );
  });
