import * as React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { initializeStore } from '@src/store';

import Container from './container';

import Modal from '@src/components/concrete/Modal';
import EmailLogin from '@src/components/concrete/Forms/EmailLogin';
import PasswordReset from '@src/components/concrete/Forms/PasswordReset';
import LoginForm from '@src/components/concrete/Forms/LoginForm';
import SignUpForm from '@src/components/concrete/Forms/SignupForm';
import RequestPasswordForm from '@src/components/concrete/Forms/RequestPasswordForm';

import langObject from '@src/data/langObject';

const lang = langObject();
const store = initializeStore({ lang });

const somethingHappened = () => {
  console.log('Something Happened');
};

storiesOf('Forms', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('login', () => (
    <Container>
      <LoginForm />
    </Container>
  ))
  .add('modal - login', () => (
    <Modal large>
      <LoginForm />
    </Modal>
  ))
  .add('modal - login (with google)', () => (
    <Modal large>
      <EmailLogin
        buttonOnClick={somethingHappened}
        email="pr********23@gmail.com"
        firstName="Preston"
        footerOnClick={somethingHappened}
        googleLogin
        lastName="Johns"
      />
    </Modal>
  ))
  .add('modal - login (with previous email)', () => (
    <Modal large>
      <EmailLogin
        buttonOnClick={somethingHappened}
        email="pr********23@gmail.com"
        firstName="Preston"
        footerOnClick={somethingHappened}
        googleLogin={false}
        lastName="Johns"
        src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
      />
    </Modal>
  ))
  .add('modal - reset password', () => (
    <Modal large>
      <PasswordReset />
    </Modal>
  ))
  .add('modal - signup', () => (
    <Modal large>
      <SignUpForm />
    </Modal>
  ))
  .add('request password', () => (
    <Container>
      <RequestPasswordForm />
    </Container>
  ))
  .add('signup', () => (
    <Container>
      <SignUpForm />
    </Container>
  ));
