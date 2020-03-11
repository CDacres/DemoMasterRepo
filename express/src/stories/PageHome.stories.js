/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import shortid from 'shortid';
import LazyLoad from 'react-lazyload';

import langObject from '@src/data/langObject';
import { browsePagesData, primaryCitiesData, secondaryCitiesData, verticalsData } from '@src/data/home';

import { ColorHelper } from '@src/helpers';

import Container from './container';

import { exampleTags, exampleVerticals } from './data';

import LandingTitle from '@src/components/concrete/LandingTitle';
import SearchBar from '@src/components/concrete/SearchBar';
import Carousel, { LargeOption, SmallOption } from '@src/components/concrete/Carousel';
import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import CallToAction from '@src/components/concrete/CallToAction';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

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

storiesOf('Pages/home', module)
  .add('home', () => {
    const verticals = verticalsData.en;
    const browsePages = browsePagesData.en;
    return (
      <Provider store={store}>
        <Container>
          <LandingTitle withZipcubeHeading />
          <SearchBar />
          <div>
            <LazyLoad
              offset={100}
              placeholder={<LoadingAnimation />}
            >
              <div>
                <Carousel
                  id="verticals"
                  isSlider
                  options={verticals.data}
                  optionTemplate={SmallOption}
                  sectionSubtitle={verticals.subtitle}
                  sectionTitle={verticals.title}
                />
              </div>
            </LazyLoad>
            <LazyLoad placeholder={<LoadingAnimation />}>
              <div>
                <Carousel
                  id="browse_pages"
                  isSlider
                  options={browsePages.data}
                  optionTemplate={LargeOption}
                  sectionSubtitle={browsePages.subtitle}
                  sectionTitle={browsePages.title}
                  type="large"
                />
              </div>
            </LazyLoad>
            {Object.keys(primaryCitiesData.en).map((cityName, index) => {
              const city = primaryCitiesData.en[cityName];
              return (
                <LazyLoad
                  key={shortid.generate()}
                  offset={index === 0 ? -100 : 100}
                  placeholder={<LoadingAnimation />}
                >
                  <div key={shortid.generate()}>
                    <CardsGrid
                      sectionSubtitle={city.subtitle}
                      sectionTitle={city.title}
                    >
                      {city.data.map(card => {
                        const color = colorHelper.getVerticalColors()[card.verticalId];
                        return (
                          <Card
                            key={shortid.generate()}
                            newTab={false}
                            {...card}
                          >
                            <CardContent
                              color={color}
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
                </LazyLoad>
              );
            })}
            <LazyLoad placeholder={<LoadingAnimation />}>
              <div>
                <CallToAction />
              </div>
            </LazyLoad>
            {Object.keys(secondaryCitiesData.en).map(cityName => {
              const city = secondaryCitiesData.en[cityName];
              return (
                <LazyLoad
                  key={shortid.generate()}
                  offset={100}
                  placeholder={<LoadingAnimation />}
                >
                  <div>
                    <Carousel
                      id={cityName}
                      isSlider
                      options={city.data}
                      optionTemplate={LargeOption}
                      sectionSubtitle={city.subtitle}
                      sectionTitle={city.title}
                      type="large"
                    />
                  </div>
                </LazyLoad>
              );
            })}
          </div>
        </Container>
      </Provider>
    );
  });
