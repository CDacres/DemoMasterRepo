import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import shortid from 'shortid';

import langObject from '@src/data/langObject';

import { ColorHelper } from '@src/helpers';

import Container from './container';

import Grid from '@src/components/concrete/Grid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import Text from '@src/components/concrete/Grid/Text';
import Content from '@src/components/concrete/Grid/Text/Content';
import SectionHeader from '@src/components/concrete/SectionHeader';

import { valuesGrid } from '@src/data/pages/about';

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

storiesOf('Grid', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('with cards', () => {
    const cards = [];
    for (let i = 0; i <= 7; i++) {
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
    const gridItems = cards.map(props => (
      <Card
        key={shortid.generate()}
        {...props}
      >
        <CardContent {...props}>
          <CardText {...props} />
        </CardContent>
      </Card>
    ));
    return (
      <Grid
        gridItems={gridItems}
        withMargin
      >
        <SectionHeader
          sectionSubtitle="Book unique venues in London"
          sectionTitle="Spaces and venues we love in London"
        />
      </Grid>
    );
  })
  .add('with text', () => {
    const gridItems = valuesGrid.map(props => (
      <Text
        key={shortid.generate()}
        {...props}
      >
        <Content {...props} />
      </Text>
    ));
    return (
      <Grid gridItems={gridItems} />
    );
  });
