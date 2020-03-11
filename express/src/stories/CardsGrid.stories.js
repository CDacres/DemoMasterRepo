import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import shortid from 'shortid';

import langObject from '@src/data/langObject';

import { ColorHelper } from '@src/helpers';

import Container from './container';

import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang
});

const colorHelper = new ColorHelper();

storiesOf('Cards Grid', module)
  .add('standard', () => {
    const cards = [];
    for (let i = 0; i <= 7; i++) {
      cards.push({
        category: faker.random.word(),
        color: colorHelper.getVerticalColors()[faker.random.number({ max: 9 })],
        id: i,
        image: faker.image.abstract(),
        link: faker.internet.url(),
        rating: faker.random.number({ max: 5 })-0.6,
        reviewsCount: i,
        text: faker.lorem.sentence(),
        title: faker.lorem.words()
      });
    }
    return (
      <Provider store={store}>
        <Container>
          <CardsGrid
            sectionSubtitle="Book unique venues in London"
            sectionTitle="Spaces and venues we love in London"
            footerText="Show all"
          >
            {cards.map(card => (
              <Card
                key={shortid.generate()}
                lazyLoadImages
                {...card}
              >
                <CardContent {...card}>
                  <CardText {...card} />
                </CardContent>
              </Card>
            ))}
          </CardsGrid>
        </Container>
      </Provider>
    );
  });
