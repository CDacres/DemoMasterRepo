/* eslint-disable no-console */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Container from './container';

import Calculate from '@src/components/concrete/Inputs/Calculate';
import Checkbox from '@src/components/concrete/Inputs/Checkbox';
import EmailInput from '@src/components/concrete/Inputs/EmailInput';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import MessageInput from '@src/components/concrete/Inputs/MessageInput';
import PasswordInput from '@src/components/concrete/Inputs/PasswordInput';
import PhoneInput from '@src/components/concrete/Inputs/PhoneInput';
import RadioButton from '@src/components/concrete/Inputs/RadioButton';
import Select from '@src/components/concrete/Inputs/Select';
import SimpleInput from '@src/components/concrete/Inputs/SimpleInput';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import ToggleSwitch from '@src/components/concrete/Inputs/ToggleSwitch';
import UserInput from '@src/components/concrete/Inputs/UserInput';

import { exampleRadioOptions } from './data';

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

const somethingHappened = () => {
  console.log('Something happened');
};

storiesOf('Inputs', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('calculate', () => (
    <Calculate
      label="Guests"
      transKey="common.people_count"
    />
  ))
  .add('checkbox', () => (
    <Checkbox
      checked={false}
      id="test"
      label="Required"
      name="test"
      onToggle={somethingHappened}
      value="test"
    />
  ))
  .add('checkbox with extras', () => (
    <Checkbox
      checked={false}
      extras={
        <React.Fragment>
          <span>£50</span>
          <span> | </span>
          <a onClick={somethingHappened}>
            Edit
          </a>
        </React.Fragment>
      }
      id="test"
      label="Breakout Space"
      name="test"
      onToggle={somethingHappened}
      value="test"
    />
  ))
  .add('email', () => (
    <EmailInput
      id="email"
      name="email"
      onChange={somethingHappened}
      onCommit={somethingHappened}
      value=""
    />
  ))

  .add('message', () => (
    <MessageInput />
  ))
  .add('password', () => (
    <PasswordInput
      id="password"
      name="password"
      onChange={somethingHappened}
      onCommit={somethingHappened}
      value=""
    />
  ))
  .add('phone', () => (
    <PhoneInput
      id="phone_number"
      label="Phone"
      name="phone_number"
      onChange={somethingHappened}
      value=""
    />
  ))
  .add('radio - bordered left', () => (
    <React.Fragment>
      <RadioButton
        boldText
        defaultOption="1"
        isLarge
        name="configuration"
        radioPosition="left"
        options={exampleRadioOptions}
      />
    </React.Fragment>
  ))
  .add('radio - no border left', () => (
    <RadioButton
      defaultOption="1"
      name="configuration"
      noBorder
      radioPosition="left"
      options={exampleRadioOptions}
    />
  ))
  .add('radio - no border right', () => (
    <RadioButton
      defaultOption="0"
      interiorPadding={{
        bottom: '3',
        top: '2',
      }}
      itemBorder
      name="configuration"
      noBorder
      radioPosition="right"
      options={exampleRadioOptions}
    />
  ))
  .add('select', () => {
    const options = [];
    const value = '';
    return (
      <Select
        onChange={somethingHappened}
        options={options}
        value={value}
      />
    );
  })
  .add('simple', () => (
    <SimpleInput />
  ))
  .add('styled checkbox', () => (
    <StyledCheckbox
      checked={false}
      id="test"
      label="Label"
      name="test"
    />
  ))
  .add('styled input', () => (
    <StyledInput
      boldLabel
      id="first_name"
      label="users.first_name"
      name="first_name"
    />
  ))
  .add('styled input - large', () => (
    <StyledInput
      id="people_input"
      isBig
      placeholder="e.g. Paul, paul@mail.com, Jerry, jerry@mail.com"
      name="people_input"
    />
  ))
  .add('styled - select', () => {
    const options = [];
    return (
      <StyledInput
        id="venue_to_review"
        label="Venue to review"
        name="venue_to_review"
        selectOptions={options}
      />
    );
  })
  .add('styled input - with icon', () => (
    <StyledInput
      icon="£"
      id="amount"
      name="amount"
      placeholder="0"
    />
  ))
  .add('toggle on', () => (
    <ToggleSwitch value={1} />
  ))
  .add('toggle off', () => (
    <ToggleSwitch value={0} />
  ))
  .add('user', () => (
    <UserInput
      id="first_name"
      name="first_name"
      onChange={somethingHappened}
      onCommit={somethingHappened}
      value=""
    />
  ));
