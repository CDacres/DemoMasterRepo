import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite/no-important';

import langObject from '@src/data/langObject';

import Modal from '@src/components/concrete/Modal';
import QuestionAnswers from '@src/components/concrete/Info/Modals/QuestionAnswers';
import InfoBanner from '@src/components/concrete/Banners/InfoBanner';
import Section from '@src/components/concrete/Info/Section';
import FullSizeImage from '@src/components/concrete/Info/Images/FullSizeImage';
import NavigationBar from '@src/components/concrete/Info/NavigationBar';
import Questions from '@src/components/concrete/Info/Questions';
import Checklist from '@src/components/concrete/Info/Columns/Checklist';
import ColumnLayout from '@src/components/concrete/Info/Columns/ColumnLayout';
import ColumnLink from '@src/components/concrete/Info/Columns/ColumnLink';
import Description from '@src/components/concrete/Info/Columns/Description';
import Icon from '@src/components/concrete/Info/Columns/Icon';
import IconPoint from '@src/components/concrete/Info/Columns/IconPoint';
import ImageQuote from '@src/components/concrete/Info/Columns/ImageQuote';
import ImageText from '@src/components/concrete/Info/Columns/ImageText';
import NumberTitle from '@src/components/concrete/Info/Columns/NumberTitle';
import Title from '@src/components/concrete/Info/Columns/Title';
import InlineTitle from '@src/components/concrete/Info/Titles/InlineTitle';
import LinedTitle from '@src/components/concrete/Info/Titles/LinedTitle';
import TopTitle from '@src/components/concrete/Info/Titles/TopTitle';
import FinancialTable from '@src/components/concrete/Tables/FinancialTable';
import Background from '@src/components/concrete/Info/Background';
import { PaymentsPayouts, PropertyDamage } from '@src/components/concrete/Icons/svgs';

import { tabs } from '@src/data/info/tabs';
import { safetyList } from '@src/data/info/page';
import { questions } from '@src/data/info/questions';

const lang = langObject();

import { margin, pagestyles } from '@src/styles';

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang,
  responsive: {},
});

storiesOf('Info Components', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('background', () => (
    <Background />
  ))
  .add('banner', () => (
    <InfoBanner
      buttonHref="#"
      buttonText="Get started"
      height="100%"
      src="https://a0.muscache.com/pictures/3d9bd982-982a-49e9-9273-9cc3e6b18edd.jpg"
      title="Ready to start hosting?"
      width="100%"
    />
  ))
  .add('checklist', () => (
    <Section>
      <Checklist
        points={safetyList}
        text="info.team_description"
        title="info.team_title"
      />
    </Section>
  ))
  .add('column layout - with image', () => (
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon icon={<PropertyDamage stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconYellow]} />} />
                <Title title="info.get_bookings_title" />
                <Description text="info.get_bookings_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon icon={<PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon48, pagestyles.iconYellow]} />} />
                <Title title="info.set_prices_title" />
                <Description text="info.set_prices_description" />
                <ColumnLink
                  href="#"
                  text="info.set_prices_link"
                />
              </React.Fragment>
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
  ))
  .add('column layout - with points', () => (
    <Section>
      <ColumnLayout
        data={
          [
            (
              <IconPoint
                key={0}
                text="info.point_coverage"
              />
            ),
            (
              <IconPoint
                key={1}
                text="info.point_applies"
              />
            ),
            (
              <IconPoint
                key={2}
                text="info.point_claims"
              />
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
  ))
  .add('column layout - with three', () => (
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Icon circleText="1" />
                <Title title="info.list_free_title" />
                <Description text="info.list_free_advertise_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Icon circleText="2" />
                <Title title="info.receive_booking_title" />
                <Description text="info.receive_booking_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={2}>
                <Icon circleText="3" />
                <Title title="info.get_paid_month_title" />
                <Description text="info.get_paid_month_description" />
              </React.Fragment>
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
  ))
  .add('column layout - with two', () => (
    <Section>
      <ColumnLayout
        data={
          [
            (
              <React.Fragment key={0}>
                <Title title="info.why_list_title" />
                <Description text="info.why_list_description" />
              </React.Fragment>
            ),
            (
              <React.Fragment key={1}>
                <Title title="info.we_have_your_back_title" />
                <Description text="info.we_have_your_back_description" />
              </React.Fragment>
            ),
          ]
        }
        smallScreenFull={true}
      />
    </Section>
  ))
  .add('image - full size', () => (
    <Section>
      <FullSizeImage
        height="440px"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg"
        width="100%"
      />
    </Section>
  ))
  .add('image - with quote', () => (
    <Section>
      <ImageQuote
        buttonText="info.learn_how_list"
        height="100%"
        href="#"
        imageFirst={true}
        quoteSubText="info.financials_quote_subtext"
        quoteText="info.financials_quote"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg"
        width="100%"
      />
    </Section>
  ))
  .add('image - with text', () => (
    <Section>
      <ImageText
        description="info.trusted_pricing_description"
        height="100%"
        src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg"
        title="info.trusted_pricing_title"
        width="100%"
      />
    </Section>
  ))
  .add('modal - question', () => (
    <Modal large>
      <QuestionAnswers question={questions.financials.left[0]} />
    </Modal>
  ))
  .add('navigation', () => (
    <NavigationBar
      buttonHref="#"
      buttonText="info.get_started"
      pageId="setup"
      tabs={tabs.how_to}
    />
  ))
  .add('questions', () => (
    <Section>
      <Questions questions={questions.financials} />
    </Section>
  ))
  .add('stats', () => (
    <Section>
      <ColumnLayout
        data={
          [
            <NumberTitle
              key={0}
              subtitle="Hosts on Zipcube"
              title="2.9M"
            />,
            <NumberTitle
              key={1}
              subtitle="Average Zipcube stays each night"
              title="800K"
            />,
            <NumberTitle
              key={2}
              subtitle="New hosts per month"
              title="14K"
            />,
          ]
        }
      />
    </Section>
  ))
  .add('table', () => (
    <Section>
      <FinancialTable />
    </Section>
  ))
  .add('title', () => (
    <Section>
      <LinedTitle title="title" />
    </Section>
  ))
  .add('title - inline', () => (
    <Section>
      <InlineTitle title="Travellers took 49 million trips with Zipcube in 2017. Only 1 in 25,000 resulted in a significant property damage claim." />
    </Section>
  ))
  .add('title - top', () => (
    <Section>
      <TopTitle
        buttonHref="#"
        buttonText="Get started"
        name="SAFETY"
        subtitle="We've taken extensive measures to help keep you, your home, and your guests safe."
        title="How Zipcube protects hosts"
      />
    </Section>
  ));
