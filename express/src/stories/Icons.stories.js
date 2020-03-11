import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite/no-important';

import Container from './container';

import { AccidentInsurance, AccountSettings, Agree, Amex, Arrow, Book, Bottle, Calendar, CalendarColor, Camera, Card, Check, CheckItem, Chevron, Clock, Close, Copy, Cross, Dot, EmployeeAccess
  , Envelope, Facebook, Fang, Flag, FoldOutMap, Gear, Globe, Google, GooglePay, Heart, House, Instagram, InvoicesBlue, InvoicesGreen, InvoicesRed, Keys, LearnMore, Lightning, LinkedIn
  , LocationPin, Lock, LoginSecurity, Magnify, MapPin, MaroonLine, MasterCard, Message, Messenger, MinusLine, NineDot, Notifications, OrangeLine, Pause, PaymentSettings, PaymentsPayouts
  , Paypal, People, Person, PersonalInfo, Phone, PinkLine, Planet, Play, Plus, PlusLine, PrivacyAndSharing, PrivacySharing, ProfessionalHosting, PropertyDamage, RadioEllipsis, Redo, Screen
  , Search, Settings, Share, ShareWithLink, ShareWithOther, SimplifyExpensing, Slider, SliderBusiness, SliderDashboard, Spacer, Speech, Sponsored, Star, StarSparkle, Step, Suitcase, ThreeLine
  , Thumb, TravelForWork, Twitter, TwoWayReviews, Visa, YellowLine, ZipcubeLogo, ZipcubeName } from '@src/components/concrete/Icons/svgs';

const styles = StyleSheet.create({
  icon: {
    display: 'block',
    height: '100px'
  },
  logo: {
    height: '50px',
    width: '35px'
  },
  logo_name: {
    height: '50px',
    width: '110px'
  },
  gallery: {
    display: 'inline-block',
    maxWidth: '20%'
  },
  iconTitle: {
    textAlign: 'center'
  },
});

storiesOf('Icons', module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add('accident insurance', () => (
    <AccidentInsurance stylesArray={[styles.icon]} />
  ))
  .add('account settings', () => (
    <AccountSettings stylesArray={[styles.icon]} />
  ))
  .add('agree', () => (
    <Agree stylesArray={[styles.icon]} />
  ))
  .add('all', () => {
    const icons = [
      {
        icon: <AccidentInsurance stylesArray={[styles.icon]} />,
        title: 'Accident insurance'
      },
      {
        icon: <AccountSettings stylesArray={[styles.icon]} />,
        title: 'Account settings'
      },
      {
        icon: <Agree stylesArray={[styles.icon]} />,
        title: 'Agree'
      },
      {
        icon: <Amex stylesArray={[styles.icon]} />,
        title: 'Amex'
      },
      {
        icon: (
          <Arrow
            direction="left"
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Arrow - left'
      },
      {
        icon: (
          <Arrow
            direction="right"
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Arrow - right'
      },
      {
        icon: <Book stylesArray={[styles.icon]} />,
        title: 'Book'
      },
      {
        icon: <Bottle stylesArray={[styles.icon]} />,
        title: 'Bottle'
      },
      {
        icon: <Calendar stylesArray={[styles.icon]} />,
        title: 'Calendar'
      },
      {
        icon: <CalendarColor stylesArray={[styles.icon]} />,
        title: 'Calendar colour'
      },
      {
        icon: <Camera stylesArray={[styles.icon]} />,
        title: 'Camera'
      },
      {
        icon: <Card stylesArray={[styles.icon]} />,
        title: 'Card'
      },
      {
        icon: (
          <Check
            stroke="#000000"
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Check'
      },
      {
        icon: <CheckItem stylesArray={[styles.icon]} />,
        title: 'Check item'
      },
      {
        icon: <Chevron stylesArray={[styles.icon]} />,
        title: 'Chevron - down'
      },
      {
        icon: (
          <Chevron
            direction="left"
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Chevron - left'
      },
      {
        icon: (
          <Chevron
            direction="right"
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Chevron - right'
      },
      {
        icon: <Clock stylesArray={[styles.icon]} />,
        title: 'Clock'
      },
      {
        icon: <Close stylesArray={[styles.icon]} />,
        title: 'Close'
      },
      {
        icon: <Copy stylesArray={[styles.icon]} />,
        title: 'Copy'
      },
      {
        icon: <Cross stylesArray={[styles.icon]} />,
        title: 'Cross'
      },
      {
        icon: <Dot stylesArray={[styles.icon]} />,
        title: 'Dot'
      },
      {
        icon: <EmployeeAccess stylesArray={[styles.icon]} />,
        title: 'Employee access'
      },
      {
        icon: <Envelope stylesArray={[styles.icon]} />,
        title: 'Envelope'
      },
      {
        icon: (
          <Envelope
            outline
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Envelope - outline'
      },
      {
        icon: <Facebook stylesArray={[styles.icon]} />,
        title: 'Facebook'
      },
      {
        icon: <Fang stylesArray={[styles.icon]} />,
        title: 'Fang'
      },
      {
        icon: (
          <Fang
            onMap
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Fang - on map'
      },
      {
        icon: <Flag stylesArray={[styles.icon]} />,
        title: 'Flag'
      },
      {
        icon: <FoldOutMap stylesArray={[styles.icon]} />,
        title: 'Fold out map'
      },
      {
        icon: <Gear stylesArray={[styles.icon]} />,
        title: 'Gear'
      },
      {
        icon: <Globe stylesArray={[styles.icon]} />,
        title: 'Globe'
      },
      {
        icon: <Google stylesArray={[styles.icon]} />,
        title: 'Google'
      },
      {
        icon: <GooglePay stylesArray={[styles.icon]} />,
        title: 'Googlepay'
      },
      {
        icon: <Heart stylesArray={[styles.icon]} />,
        title: 'Heart'
      },
      {
        icon: <House stylesArray={[styles.icon]} />,
        title: 'House'
      },
      {
        icon: <Instagram stylesArray={[styles.icon]} />,
        title: 'Instagram'
      },
      {
        icon: <InvoicesBlue stylesArray={[styles.icon]} />,
        title: 'Invoices - blue'
      },
      {
        icon: <InvoicesGreen stylesArray={[styles.icon]} />,
        title: 'Invoices - green'
      },
      {
        icon: <InvoicesRed stylesArray={[styles.icon]} />,
        title: 'Invoices - red'
      },
      {
        icon: <Keys stylesArray={[styles.icon]} />,
        title: 'Keys'
      },
      {
        icon: <LearnMore stylesArray={[styles.icon]} />,
        title: 'Learn more'
      },
      {
        icon: <Lightning stylesArray={[styles.icon]} />,
        title: 'Lightning'
      },
      {
        icon: (
          <div style={{ color: '#a61d55' }}>
            <MaroonLine />
          </div>
        ),
        title: 'Line - maroon'
      },
      {
        icon: (
          <div style={{ color: '#ff5a5f' }}>
            <OrangeLine />
          </div>
        ),
        title: 'Line - orange'
      },
      {
        icon: (
          <div style={{ color: '#e0929b' }}>
            <PinkLine />
          </div>
        ),
        title: 'Line - pink'
      },
      {
        icon: (
          <div style={{ color: '#ffb400' }}>
            <YellowLine />
          </div>
        ),
        title: 'Line - yellow'
      },
      {
        icon: <LinkedIn stylesArray={[styles.icon]} />,
        title: 'LinkedIn'
      },
      {
        icon: <LocationPin stylesArray={[styles.icon]} />,
        title: 'Location pin'
      },
      {
        icon: <Lock stylesArray={[styles.icon]} />,
        title: 'Lock'
      },
      {
        icon: <LoginSecurity stylesArray={[styles.icon]} />,
        title: 'Login security'
      },
      {
        icon: <Magnify stylesArray={[styles.icon]} />,
        title: 'Magnify'
      },
      {
        icon: <MapPin stylesArray={[styles.icon]} />,
        title: 'Map pin'
      },
      {
        icon: (
          <MapPin
            outline
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Map pin outline'
      },
      {
        icon: <MasterCard stylesArray={[styles.icon]} />,
        title: 'Mastercard'
      },
      {
        icon: <Message stylesArray={[styles.icon]} />,
        title: 'Message'
      },
      {
        icon: <Messenger stylesArray={[styles.icon]} />,
        title: 'Messenger'
      },
      {
        icon: <MinusLine stylesArray={[styles.icon]} />,
        title: 'Minus - line'
      },
      {
        icon: <NineDot stylesArray={[styles.icon]} />,
        title: 'Nine dot'
      },
      {
        icon: <Notifications stylesArray={[styles.icon]} />,
        title: 'Notifications'
      },
      {
        icon: <Pause stylesArray={[styles.icon]} />,
        title: 'Pause'
      },
      {
        icon: <PaymentsPayouts stylesArray={[styles.icon]} />,
        title: 'Payment - payouts'
      },
      {
        icon: <PaymentSettings stylesArray={[styles.icon]} />,
        title: 'Payment - settings'
      },
      {
        icon: <Paypal stylesArray={[styles.icon]} />,
        title: 'Paypal'
      },
      {
        icon: <People stylesArray={[styles.icon]} />,
        title: 'People'
      },
      {
        icon: <Person stylesArray={[styles.icon]} />,
        title: 'Person'
      },
      {
        icon: <PersonalInfo stylesArray={[styles.icon]} />,
        title: 'Personal info'
      },
      {
        icon: <Phone stylesArray={[styles.icon]} />,
        title: 'Phone'
      },
      {
        icon: <Planet stylesArray={[styles.icon]} />,
        title: 'Planet'
      },
      {
        icon: <Play stylesArray={[styles.icon]} />,
        title: 'Play'
      },
      {
        icon: <Plus stylesArray={[styles.icon]} />,
        title: 'Plus'
      },
      {
        icon: <PlusLine stylesArray={[styles.icon]} />,
        title: 'Plus - line'
      },
      {
        icon: <PrivacyAndSharing stylesArray={[styles.icon]} />,
        title: 'Privacy and sharing'
      },
      {
        icon: <PrivacySharing stylesArray={[styles.icon]} />,
        title: 'Privacy sharing'
      },
      {
        icon: <ProfessionalHosting stylesArray={[styles.icon]} />,
        title: 'Professional hosting'
      },
      {
        icon: <PropertyDamage stylesArray={[styles.icon]} />,
        title: 'Property damage'
      },
      {
        icon: <RadioEllipsis stylesArray={[styles.icon]} />,
        title: 'Radio ellipsis'
      },
      {
        icon: <Redo stylesArray={[styles.icon]} />,
        title: 'Redo'
      },
      {
        icon: <Screen stylesArray={[styles.icon]} />,
        title: 'Screen'
      },
      {
        icon: <Search stylesArray={[styles.icon]} />,
        title: 'Search'
      },
      {
        icon: <Settings stylesArray={[styles.icon]} />,
        title: 'Settings'
      },
      {
        icon: <Share stylesArray={[styles.icon]} />,
        title: 'Share'
      },
      {
        icon: <ShareWithLink stylesArray={[styles.icon]} />,
        title: 'Share with link'
      },
      {
        icon: <ShareWithOther stylesArray={[styles.icon]} />,
        title: 'Share with other'
      },
      {
        icon: <SimplifyExpensing stylesArray={[styles.icon]} />,
        title: 'Simplify expensing'
      },
      {
        icon: <Slider stylesArray={[styles.icon]} />,
        title: 'Slider'
      },
      {
        icon: <SliderBusiness stylesArray={[styles.icon]} />,
        title: 'Slider - business'
      },
      {
        icon: <SliderDashboard stylesArray={[styles.icon]} />,
        title: 'Slider - dashboard'
      },
      {
        icon: <Spacer stylesArray={[styles.icon]} />,
        title: 'Spacer'
      },
      {
        icon: <Speech stylesArray={[styles.icon]} />,
        title: 'Speech'
      },
      {
        icon: <Sponsored stylesArray={[styles.icon]} />,
        title: 'Sponsored'
      },
      {
        icon: <Star stylesArray={[styles.icon]} />,
        title: 'Star'
      },
      {
        icon: (
          <Star
            inHalf
            stylesArray={[styles.icon]}
          />
        ),
        title: 'Star - half'
      },
      {
        icon: <StarSparkle stylesArray={[styles.icon]} />,
        title: 'Star - sparkle'
      },
      {
        icon: <Step stylesArray={[styles.icon]} />,
        title: 'Step'
      },
      {
        icon: <Suitcase stylesArray={[styles.icon]} />,
        title: 'Suitcase'
      },
      {
        icon: <Thumb stylesArray={[styles.icon]} />,
        title: 'Thumb'
      },
      {
        icon: <TravelForWork stylesArray={[styles.icon]} />,
        title: 'Travel for work'
      },
      {
        icon: <ThreeLine stylesArray={[styles.icon]} />,
        title: 'Three line'
      },
      {
        icon: <Twitter stylesArray={[styles.icon]} />,
        title: 'Twitter'
      },
      {
        icon: <TwoWayReviews stylesArray={[styles.icon]} />,
        title: 'Two way reviews'
      },
      {
        icon: <Visa stylesArray={[styles.icon]} />,
        title: 'Visa'
      },
      {
        icon: (
          <ZipcubeLogo
            stylesArray={[styles.logo]}
            viewBox="8 7 10 30"
          />
        ),
        title: 'Zipcube logo'
      },
      {
        icon: <ZipcubeName stylesArray={[styles.logo_name]} />,
        title: 'Zipcube name'
      }
    ];
    return (
      <React.Fragment>
        {icons.map((item, index) => (
          <div
            className={css(styles.gallery)}
            key={index}
          >
            {item.icon}
            <div className={css(styles.iconTitle)}>
              {item.title}
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  })
  .add('amex', () => (
    <Amex stylesArray={[styles.icon]} />
  ))
  .add('arrow - left', () => (
    <Arrow
      direction="left"
      stylesArray={[styles.icon]}
    />
  ))
  .add('arrow - right', () => (
    <Arrow
      direction="right"
      stylesArray={[styles.icon]}
    />
  ))
  .add('book', () => (
    <Book stylesArray={[styles.icon]} />
  ))
  .add('bottle', () => (
    <Bottle stylesArray={[styles.icon]} />
  ))
  .add('calendar', () => (
    <Calendar stylesArray={[styles.icon]} />
  ))
  .add('calendar colour', () => (
    <CalendarColor stylesArray={[styles.icon]} />
  ))
  .add('camera', () => (
    <Camera stylesArray={[styles.icon]} />
  ))
  .add('card', () => (
    <Card stylesArray={[styles.icon]} />
  ))
  .add('check', () => (
    <Check
      stroke="#000000"
      stylesArray={[styles.icon]}
    />
  ))
  .add('check item', () => (
    <CheckItem stylesArray={[styles.icon]} />
  ))
  .add('chevron - down', () => (
    <Chevron stylesArray={[styles.icon]} />
  ))
  .add('chevron - left', () => (
    <Chevron
      direction="left"
      stylesArray={[styles.icon]}
    />
  ))
  .add('chevron - right', () => (
    <Chevron
      direction="right"
      stylesArray={[styles.icon]}
    />
  ))
  .add('clock', () => (
    <Clock stylesArray={[styles.icon]} />
  ))
  .add('close', () => (
    <Close stylesArray={[styles.icon]} />
  ))
  .add('copy', () => (
    <Copy stylesArray={[styles.icon]} />
  ))
  .add('cross', () => (
    <Cross stylesArray={[styles.icon]} />
  ))
  .add('dot', () => (
    <Dot stylesArray={[styles.icon]} />
  ))
  .add('employee access', () => (
    <EmployeeAccess stylesArray={[styles.icon]} />
  ))
  .add('envelope', () => (
    <Envelope stylesArray={[styles.icon]} />
  ))
  .add('envelope - outline', () => (
    <Envelope
      outline
      stylesArray={[styles.icon]}
    />
  ))
  .add('facebook', () => (
    <Facebook stylesArray={[styles.icon]} />
  ))
  .add('fang', () => (
    <Fang stylesArray={[styles.icon]} />
  ))
  .add('fang - on map', () => (
    <Fang
      onMap
      stylesArray={[styles.icon]}
    />
  ))
  .add('flag', () => (
    <Flag stylesArray={[styles.icon]} />
  ))
  .add('fold out map', () => (
    <FoldOutMap stylesArray={[styles.icon]} />
  ))
  .add('gear', () => (
    <Gear stylesArray={[styles.icon]} />
  ))
  .add('globe', () => (
    <Globe stylesArray={[styles.icon]} />
  ))
  .add('google', () => (
    <Google stylesArray={[styles.icon]} />
  ))
  .add('googlepay', () => (
    <GooglePay stylesArray={[styles.icon]} />
  ))
  .add('heart', () => (
    <Heart stylesArray={[styles.icon]} />
  ))
  .add('house', () => (
    <House stylesArray={[styles.icon]} />
  ))
  .add('instagram', () => (
    <Instagram stylesArray={[styles.icon]} />
  ))
  .add('invoices - blue', () => (
    <InvoicesBlue stylesArray={[styles.icon]} />
  ))
  .add('invoices - green', () => (
    <InvoicesGreen stylesArray={[styles.icon]} />
  ))
  .add('invoices - red', () => (
    <InvoicesRed stylesArray={[styles.icon]} />
  ))
  .add('keys', () => (
    <Keys stylesArray={[styles.icon]} />
  ))
  .add('learn more', () => (
    <LearnMore stylesArray={[styles.icon]} />
  ))
  .add('lightning', () => (
    <Lightning stylesArray={[styles.icon]} />
  ))
  .add('line - maroon', () => (
    <div style={{ color: '#a61d55' }}>
      <MaroonLine />
    </div>
  ))
  .add('line - orange', () => (
    <div style={{ color: '#ff5a5f' }}>
      <OrangeLine />
    </div>
  ))
  .add('line - pink', () => (
    <div style={{ color: '#e0929b' }}>
      <PinkLine />
    </div>
  ))
  .add('line - yellow', () => (
    <div style={{ color: '#ffb400' }}>
      <YellowLine />
    </div>
  ))
  .add('linkedin', () => (
    <LinkedIn stylesArray={[styles.icon]} />
  ))
  .add('location pin', () => (
    <LocationPin stylesArray={[styles.icon]} />
  ))
  .add('lock', () => (
    <Lock stylesArray={[styles.icon]} />
  ))
  .add('login security', () => (
    <LoginSecurity stylesArray={[styles.icon]} />
  ))
  .add('magnify', () => (
    <Magnify stylesArray={[styles.icon]} />
  ))
  .add('map pin', () => (
    <MapPin stylesArray={[styles.icon]} />
  ))
  .add('map pin outline', () => (
    <MapPin
      outline
      stylesArray={[styles.icon]}
    />
  ))
  .add('mastercard', () => (
    <MasterCard stylesArray={[styles.icon]} />
  ))
  .add('message', () => (
    <Message stylesArray={[styles.icon]} />
  ))
  .add('messenger', () => (
    <Messenger stylesArray={[styles.icon]} />
  ))
  .add('minus - line', () => (
    <MinusLine stylesArray={[styles.icon]} />
  ))
  .add('nine dot', () => (
    <NineDot stylesArray={[styles.icon]} />
  ))
  .add('notifications', () => (
    <Notifications stylesArray={[styles.icon]} />
  ))
  .add('pause', () => (
    <Pause stylesArray={[styles.icon]} />
  ))
  .add('payment - payouts', () => (
    <PaymentsPayouts stylesArray={[styles.icon]} />
  ))
  .add('payment - settings', () => (
    <PaymentSettings stylesArray={[styles.icon]} />
  ))
  .add('paypal', () => (
    <Paypal stylesArray={[styles.icon]} />
  ))
  .add('people', () => (
    <People stylesArray={[styles.icon]} />
  ))
  .add('person', () => (
    <Person stylesArray={[styles.icon]} />
  ))
  .add('personal info', () => (
    <PersonalInfo stylesArray={[styles.icon]} />
  ))
  .add('phone', () => (
    <Phone stylesArray={[styles.icon]} />
  ))
  .add('planet', () => (
    <Planet stylesArray={[styles.icon]} />
  ))
  .add('play', () => (
    <Play stylesArray={[styles.icon]} />
  ))
  .add('plus', () => (
    <Plus stylesArray={[styles.icon]} />
  ))
  .add('plus - line', () => (
    <PlusLine stylesArray={[styles.icon]} />
  ))
  .add('privacy and sharing', () => (
    <PrivacyAndSharing stylesArray={[styles.icon]} />
  ))
  .add('privacy sharing', () => (
    <PrivacySharing stylesArray={[styles.icon]} />
  ))
  .add('professional hosting', () => (
    <ProfessionalHosting stylesArray={[styles.icon]} />
  ))
  .add('property damage', () => (
    <PropertyDamage stylesArray={[styles.icon]} />
  ))
  .add('radio ellipsis', () => (
    <RadioEllipsis stylesArray={[styles.icon]} />
  ))
  .add('redo', () => (
    <Redo stylesArray={[styles.icon]} />
  ))
  .add('screen', () => (
    <Screen stylesArray={[styles.icon]} />
  ))
  .add('search', () => (
    <Search stylesArray={[styles.icon]} />
  ))
  .add('settings', () => (
    <Settings stylesArray={[styles.icon]} />
  ))
  .add('share', () => (
    <Share stylesArray={[styles.icon]} />
  ))
  .add('share with link', () => (
    <ShareWithLink stylesArray={[styles.icon]} />
  ))
  .add('share with other', () => (
    <ShareWithOther stylesArray={[styles.icon]} />
  ))
  .add('simplify expensing', () => (
    <SimplifyExpensing stylesArray={[styles.icon]} />
  ))
  .add('slider', () => (
    <Slider stylesArray={[styles.icon]} />
  ))
  .add('slider - business', () => (
    <SliderBusiness stylesArray={[styles.icon]} />
  ))
  .add('slider - dashboard', () => (
    <SliderDashboard stylesArray={[styles.icon]} />
  ))
  .add('spacer', () => (
    <Spacer stylesArray={[styles.icon]} />
  ))
  .add('speech', () => (
    <Speech stylesArray={[styles.icon]} />
  ))
  .add('sponsored', () => (
    <Sponsored stylesArray={[styles.icon]} />
  ))
  .add('star', () => (
    <Star stylesArray={[styles.icon]} />
  ))
  .add('star - half', () => (
    <Star
      inHalf
      stylesArray={[styles.icon]}
    />
  ))
  .add('star - sparkle', () => (
    <StarSparkle stylesArray={[styles.icon]} />
  ))
  .add('step', () => (
    <Step stylesArray={[styles.icon]} />
  ))
  .add('suitcase', () => (
    <Suitcase stylesArray={[styles.icon]} />
  ))
  .add('thumb', () => (
    <Thumb stylesArray={[styles.icon]} />
  ))
  .add('travel for work', () => (
    <TravelForWork stylesArray={[styles.icon]} />
  ))
  .add('three line', () => (
    <ThreeLine stylesArray={[styles.icon]} />
  ))
  .add('twitter', () => (
    <Twitter stylesArray={[styles.icon]} />
  ))
  .add('two way reviews', () => (
    <TwoWayReviews stylesArray={[styles.icon]} />
  ))
  .add('visa', () => (
    <Visa stylesArray={[styles.icon]} />
  ))
  .add('zipcube logo', () => (
    <ZipcubeLogo
      stylesArray={[styles.logo]}
      viewBox="8 7 10 30"
    />
  ))
  .add('zipcube name', () => (
    <ZipcubeName stylesArray={[styles.logo_name]} />
  ));
