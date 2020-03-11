/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Container from './container';

import CheckoutPageComponent from '@src/components/concrete/CheckoutPage/CheckoutPageComponent';
import AddOnsStep from '@src/components/concrete/Checkout/Steps/AddOnsStep';
import PaymentStep from '@src/components/concrete/Checkout/Steps/PaymentStep';
import ReviewStep from '@src/components/concrete/Checkout/Steps/ReviewStep';
import SummaryStep from '@src/components/concrete/Checkout/Steps/SummaryStep';
import CheckoutLeftSide from '@src/components/concrete/Checkout/CheckoutLeftSide';
import AmenitiesList from '@src/components/concrete/Checkout/CheckoutLeftSide/AmenitiesList';
import CancellationPolicy from '@src/components/concrete/Checkout/CheckoutLeftSide/CancellationPolicy';
import CommentSection from '@src/components/concrete/Checkout/CheckoutLeftSide/CommentSection';
import Date from '@src/components/concrete/Checkout/CheckoutLeftSide/Date';
import DropDown from '@src/components/concrete/Checkout/CheckoutLeftSide/DropDown';
import LegalSection from '@src/components/concrete/Checkout/CheckoutLeftSide/LegalSection';
import MobileBottomSection from '@src/components/concrete/Checkout/CheckoutLeftSide/MobileBottomSection';
import MotivationSection from '@src/components/concrete/Checkout/CheckoutLeftSide/MotivationSection';
import PaymentDetails from '@src/components/concrete/Checkout/CheckoutLeftSide/PaymentDetails';
import ServiceRating from '@src/components/concrete/Checkout/CheckoutLeftSide/ServiceRating';
import SummaryInfo from '@src/components/concrete/Checkout/CheckoutLeftSide/SummaryInfo';
import Toggle from '@src/components/concrete/Checkout/CheckoutLeftSide/Toggle';
import WarningBox from '@src/components/concrete/Checkout/CheckoutLeftSide/WarningBox';
import CheckoutRightSide from '@src/components/concrete/Checkout/CheckoutRightSide';
import Content from '@src/components/concrete/Checkout/CheckoutRightSide/Content';
import ProductHeader from '@src/components/concrete/Checkout/CheckoutRightSide/ProductHeader';
import BookingDetails from '@src/components/concrete/Checkout/CheckoutRightSide/Content/BookingDetails';
import ContentItem from '@src/components/concrete/Checkout/CheckoutRightSide/Content/ContentItem';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import Calculate from '@src/components/concrete/Inputs/Calculate';
import RadioButton from '@src/components/concrete/Inputs/RadioButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { People, Phone } from '@src/components/concrete/Icons/svgs';
import Header from '@src/components/concrete/Header';

import { amenities, cancellationItems, dates, info, layoutItems, navItems, sidebarDetails, steps } from '@src/data/checkout/info';

const lang = langObject();

import { pagestyles } from '@src/styles';

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false,
      isSpoofMode: false
    }
  },
  config: {
    domain: 'uk',
    header: {
      smallLogo: true,
      stayAsLink: true,
      withCheckoutSteps: true
    },
    phone: {}
  },
  lang,
  responsive: {}
});

const somethingHappened = () => {
  console.log('Something Happened');
};

storiesOf('Checkout Components', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('amenities', () => (
    <Container>
      <AmenitiesList amenities={amenities} />
    </Container>
  ))
  .add('cancellation options', () => (
    <Container>
      <RadioButton
        boldText
        defaultOption="1"
        isLarge
        name="cancellation"
        radioPosition="left"
        options={cancellationItems}
      />
    </Container>
  ))
  .add('cancellation policy', () => (
    <Container>
      <CancellationPolicy
        description={info.cancelDescription}
        onClick={somethingHappened}
        title={info.cancelTitle}
      />
    </Container>
  ))
  .add('comment', () => (
    <Container>
      <CommentSection
        description={info.commentDescription}
        label="input box"
        placeholder={info.commentPlaceholder}
        src={info.ownerImgSrc}
        title={info.commentTitle}
      />
    </Container>
  ))
  .add('date', () => (
    <Container>
      <Date
        dayFrom={dates.from.day}
        dayTo={dates.to.day}
        monthFrom={dates.from.month}
        monthTo={dates.to.month}
        monthShortFrom={dates.from.monthShort}
        monthShortTo={dates.to.monthShort}
        textFrom={dates.from.text}
        textTo={dates.to.text}
        timeFrom={dates.from.time}
        timeTo={dates.to.time}
        title={dates.title}
      />
    </Container>
  ))
  .add('drop down menu', () => (
    <Container>
      <DropDown
        title={info.guestsTitle}
        transKey="common.people_count"
      />
    </Container>
  ))
  .add('guests', () => (
    <Container>
      <Calculate
        label={info.guestsTitle}
        price="£5"
        transKey="common.people_count"
      />
    </Container>
  ))
  .add('layout options', () => (
    <Container>
      <RadioButton
        boldText
        defaultOption="1"
        isLarge
        name="configuration"
        radioPosition="left"
        options={layoutItems}
      />
    </Container>
  ))
  .add('legal', () => (
    <Container>
      <LegalSection text={info.legalText} />
    </Container>
  ))
  .add('mobile bottom bar', () => (
    <MobileBottomSection
      agreeOnClick={somethingHappened}
      buttonText={steps.review.mobileButtonText}
      detailsOnClick={somethingHappened}
      price={info.mobilePrice}
      text={info.mobileText}
    />
  ))
  .add('motivation', () => (
    <Container>
      <MotivationSection
        description={info.motivationDescription}
        text={info.motivationText}
      />
    </Container>
  ))
  .add('navigation bar', () => (
    <Header />
  ))
  .add('payment', () => (
    <Container>
      <PaymentDetails label="checkout.payments_index_form_payment_card_heading" />
    </Container>
  ))
  .add('right side', () => (
    <CheckoutPageComponent>
      <CheckoutLeftSide />
      <CheckoutRightSide>
        <ProductHeader
          rating={sidebarDetails.rating}
          reviewsCount={sidebarDetails.reviewsCount}
          src={sidebarDetails.image}
          subtitle={sidebarDetails.subtitle}
          title={sidebarDetails.title}
        />
        <ContentSeparator marginNum={3} />
        <Content
          flexibleBooking={false}
          onClick={somethingHappened}
        >
          <BookingDetails
            endDateTime={sidebarDetails.dateTimes[0].endDateTime}
            guests={sidebarDetails.guests}
            startDateTime={sidebarDetails.dateTimes[0].startDateTime}
          />
          <BookingDetails
            endDateTime={sidebarDetails.dateTimes[1].endDateTime}
            guests={sidebarDetails.guests}
            startDateTime={sidebarDetails.dateTimes[1].startDateTime}
          />
          <BookingDetails
            guests={sidebarDetails.guests}
            startDateTime={sidebarDetails.dateTimes[2].startDateTime}
          />
          <ContentSeparator marginNum={3} />
          <ContentItem
            isFirst
            price={sidebarDetails.prices[0].price}
            text={sidebarDetails.prices[0].text}
          />
          <ContentItem
            price={sidebarDetails.prices[7].price}
            text={sidebarDetails.prices[7].text}
          />
          <ContentItem
            price={sidebarDetails.prices[12].price}
            text={sidebarDetails.prices[12].text}
          />
        </Content>
      </CheckoutRightSide>
    </CheckoutPageComponent>
  ))
  .add('service rating', () => (
    <Container>
      <ServiceRating canButtonBeEnabled={somethingHappened} />
    </Container>
  ))
  .add('step - addons + flexible', () => (
    <CheckoutPageComponent>
      <AddOnsStep
        detailsClick={somethingHappened}
        onClick={somethingHappened}
      />
    </CheckoutPageComponent>
  ))
  .add('step - payment', () => (
    <CheckoutPageComponent>
      <PaymentStep
        cancellationClick={somethingHappened}
        couponClick={somethingHappened}
        onClick={somethingHappened}
      />
    </CheckoutPageComponent>
  ))
  .add('step - review', () => (
    <CheckoutPageComponent>
      <ReviewStep
        detailsClick={somethingHappened}
        onClick={somethingHappened}
      />
    </CheckoutPageComponent>
  ))
  .add('step - summary', () => (
    <CheckoutPageComponent>
      <SummaryStep
        id='40124'
        onClick={somethingHappened}
      />
    </CheckoutPageComponent>
  ))
  .add('summary', () => (
    <Container>
      <SummaryInfo text={info.summaryPhone}>
        <Phone stylesArray={[pagestyles.icon, pagestyles.icon24, pagestyles.iconBlack]} />
      </SummaryInfo>
      <SummaryInfo text={info.summaryPeople}>
        <People stylesArray={[pagestyles.icon, pagestyles.icon24, pagestyles.iconBlack]} />
      </SummaryInfo>
    </Container>
  ))
  .add('toggle', () => (
    <Container>
      <Toggle
        id="accommodation"
        text={info.reviewToggleTitle}
      />
    </Container>
  ))
  .add('warning box', () => (
    <Container>
      <WarningBox text={info.summaryWarning} />
    </Container>
  ));
