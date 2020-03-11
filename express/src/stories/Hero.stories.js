/* eslint-disable max-len */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { css } from 'aphrodite/no-important';

import langObject from '@src/data/langObject';

import Hero from '@src/components/concrete/Hero';
import HeroSection from '@src/components/concrete/Hero/HeroSection';
import HeroText from '@src/components/concrete/Hero/HeroText';
import GenericHeader from '@src/components/concrete/GenericHeader';
import StyledButton from '@src/components/concrete/Button/StyledButton';

const lang = langObject();

import { margin, pagestyles } from '@src/styles';

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang
});

storiesOf('Hero', module)
  .add('with dual buttons', () => (
    <Provider store={store}>
      <Hero backgroundImage="/_express/images/pages/about/hero-aboutus.jpg">
        <HeroSection>
          <React.Fragment>
            <GenericHeader
              stylesArray={[pagestyles.h1SmallScreen]}
              tag="h1"
              text="Our Mission:"
            />
            <HeroText>
              To be the world's most customer-centric
              company, where everyone can find, rent or
              book any space, anytime, anywhere
            </HeroText>
          </React.Fragment>
        </HeroSection>
        <div className={css(margin.top_4)}>
          <div className={css(pagestyles.inlineBlock)}>
            <div className={css(margin.right_2)}>
              <StyledButton
                buttonColor="primary"
                href="#"
              >
                Book a space
              </StyledButton>
            </div>
          </div>
          <div className={css(pagestyles.inlineBlockSpaced)}>
            <StyledButton href="#">
              Visit your dashboard
            </StyledButton>
          </div>
        </div>
      </Hero>
    </Provider>
  ));
