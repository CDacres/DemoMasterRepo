/* eslint-disable no-console */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite/no-important';

import langObject from '@src/data/langObject';

import Container from './container';

import Button from '@src/components/concrete/Button';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { Envelope } from '@src/components/concrete/Icons/svgs';

const lang = langObject();

const styles = StyleSheet.create({
  iconText: {
    marginLeft: '22px'
  },
  buttonIcon: {
    position: 'absolute',
    left: '20px',
    top: '14px'
  }
});

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang
});

const buttonClicked = () => {
  console.log('Button Clicked');
};

storiesOf('Button', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('as buttons', () => (
    <React.Fragment>
      <Button action={buttonClicked}>
        Un-styled
      </Button>
      <StyledButton action={buttonClicked}>
        Normal
      </StyledButton>
      <StyledButton
        action={buttonClicked}
        buttonColor="primary"
      >
        Primary
      </StyledButton>
      <StyledButton
        action={buttonClicked}
        buttonColor="success"
      >
        Success
      </StyledButton>
      <StyledButton
        action={buttonClicked}
        buttonColor="warning"
      >
        Warning
      </StyledButton>
      <StyledButton
        action={buttonClicked}
        buttonColor="danger"
      >
        Danger
      </StyledButton>
      <StyledButton
        action={buttonClicked}
        buttonColor="link"
      >
        Link
      </StyledButton>
      <StyledButton
        action={buttonClicked}
        customSpanStyle={[styles.iconText]}
      >
        <span className={css(styles.buttonIcon)}>
          <Envelope outline />
        </span>
        <span>
          With Icon
        </span>
      </StyledButton>
    </React.Fragment>
  ))
  .add('as links', () => (
    <React.Fragment>
      <StyledButton href="www.google.co.uk">
        Normal
      </StyledButton>
      <StyledButton
        href="www.google.co.uk"
        buttonColor="primary"
      >
        Primary
      </StyledButton>
      <StyledButton
        href="www.google.co.uk"
        buttonColor="success"
      >
        Success
      </StyledButton>
      <StyledButton
        href="www.google.co.uk"
        buttonColor="warning"
      >
        Warning
      </StyledButton>
      <StyledButton
        href="www.google.co.uk"
        buttonColor="danger"
      >
        Danger
      </StyledButton>
      <StyledButton
        href="www.google.co.uk"
        buttonColor="link"
      >
        Link
      </StyledButton>
    </React.Fragment>
  ));
