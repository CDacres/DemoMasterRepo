import * as React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CarouselComponent from './CarouselComponent';

const mockStore = configureStore([]);

const initialState = {};
const store = mockStore(initialState);

describe('Carousel Component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <CarouselComponent
          options={[
            {
              image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/de/tagung.jpg',
              link: 's?tag=meetingraum',
              prefetch: true,
              text: 'Tagung'
            },
            {
              image: 'https://www.zipcube.com/css/images/landing_pages/home/verticalsData/de/buro.jpg',
              link: 's?tag=b%C3%BCro-mieten',
              prefetch: true,
              text: 'Büro'
            }
          ]}
          getTranslateX={jest.fn()}
          imageHeight={40}
          isSlider
          onSlide={jest.fn()}
          translateDenominator={5}
          translateMultiplier={0}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });
});
