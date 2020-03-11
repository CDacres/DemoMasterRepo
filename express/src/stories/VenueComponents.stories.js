/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Container from './container';

import VenuePageFooter from '@src/components/concrete/Venue/VenuePageFooter';
import FullScreenPhotos from '@src/components/concrete/Venue/VenueSection/SectionPhotos/FullScreenPhotos';
import VenueTopPhotos from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos';
import Info from '@src/components/concrete/Venue/VenueTop/TopInformationBox/Items/Info';
import Title from '@src/components/concrete/Venue/VenueTop/TopInformationBox/Items/Title';
import MiniMenu from '@src/components/concrete/Venue/MiniMenu';
import VenueSection from '@src/components/concrete/Venue/VenueSection';
import SectionContent from '@src/components/concrete/Venue/VenueSection/SectionContent';
import SectionHeader from '@src/components/concrete/Venue/VenueSection/SectionHeader';
import SectionMap from '@src/components/concrete/Venue/VenueSection/SectionMap';
import SectionNavigation from '@src/components/concrete/Venue/VenueSection/SectionNavigation';
import SectionPhotos from '@src/components/concrete/Venue/VenueSection/SectionPhotos';
import SectionPrice from '@src/components/concrete/Venue/VenueSection/SectionPrice';
import SectionText from '@src/components/concrete/Venue/VenueSection/SectionText';
import RoomMenu from '@src/components/concrete/Product/RoomMenu';
import RoomReviews from '@src/components/concrete/Product/RoomReviews';
import RoomAmenities from '@src/components/concrete/Product/RoomAmenities';
import InfoList from '@src/components/concrete/Venue/VenuePopUp/InfoList';
import PopUpDatePicker from '@src/components/concrete/Venue/VenuePopUp/PopUpDatePicker';
import VenuePopUp from '@src/components/concrete/Venue/VenuePopUp';
import PopUpTop from '@src/components/concrete/Venue/VenuePopUp/PopUpTop';
import ContactPopUp from '@src/components/concrete/Venue/ContactPopUp';
import OpeningHours from '@src/components/concrete/OpeningHours';

import { footer } from '@src/data/venue/footer';
import { badges, header, info, location, menu as menuData, navigation, sections, title } from '@src/data/venue/info';
import { menu as partyMenu, opening as partyOpening, prices as partyPrices, pricePackages as partyPackages } from '@src/data/venue/party';
import { menu as meetingMenu, opening as meetingOpening, prices as meetingPrices, pricePackages as meetingPackages, rating as ratingData, reviews as reviewData } from '@src/data/venue/meeting';
import { images as imageData, opening as officeOpening, pricePackages as officePackages } from '@src/data/venue/office';
import { menu as diningMenu, opening as diningOpening, prices as diningPrices, pricePackages as diningPackages } from '@src/data/venue/dining';
import { amenities as amenityData, menu as weddingMenu, opening as weddingOpening, prices as weddingPrices, pricePackages as weddingPackages } from '@src/data/venue/wedding';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false
    }
  },
  config: {
    domain: 'uk',
    footer: {},
    header: {},
    language: 'en',
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    },
    route: {
      domainSpecific: true,
      pathname: '/'
    }
  },
  lang,
  responsive: {}
});

storiesOf('Venue Components', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('amenities', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.amenities.header} />
        <SectionContent>
          <RoomAmenities
            amenities={amenityData}
            currency={meetingPrices.currency}
            inVenuePage
          />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('date picker', () => (
    <Container>
      <PopUpDatePicker />
    </Container>
  ))
  .add('footer', () => (
    <VenuePageFooter
      currency={footer.currency}
      price={footer.price}
      rating={footer.rating}
      reviewsCount={footer.reviewsCount}
      src={footer.src}
      subtitle={footer.subtitle}
      title={footer.title}
    />
  ))
  .add('full screen photos', () => (
    <Container>
      <FullScreenPhotos />
    </Container>
  ))
  .add('map', () => (
    <Container>
      <VenueSection
        extras={
          <SectionMap location={location} />
        }
      >
        <SectionHeader text={sections.location.header} />
        <SectionContent>
          <SectionText text={sections.location.text} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('menu - dining', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.menu.header} />
        <SectionContent>
          <RoomMenu
            currency={diningPrices.currency}
            inVenuePage
            menu={diningMenu}
          />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('menu - meeting', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.menu.header} />
        <SectionContent>
          <RoomMenu
            currency={meetingPrices.currency}
            inVenuePage
            menu={meetingMenu}
          />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('menu - party', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.menu.header} />
        <SectionContent>
          <RoomMenu
            currency={partyPrices.currency}
            inVenuePage
            menu={partyMenu}
          />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('menu - wedding', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.menu.header} />
        <SectionContent>
          <RoomMenu
            currency={weddingPrices.currency}
            inVenuePage
            menu={weddingMenu}
          />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('navigation', () => (
    <Container>
      <VenueSection isVertical>
        <SectionHeader
          isVertical
          text={sections.navigation.header}
        />
        <SectionContent isVertical>
          <SectionNavigation navigation={navigation} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('opening hours - dining', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.openingHours.header} />
        <SectionContent>
          <OpeningHours opening={diningOpening} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('opening hours - meeting', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.openingHours.header} />
        <SectionContent>
          <OpeningHours opening={meetingOpening} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('opening hours - office', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.openingHours.header} />
        <SectionContent>
          <OpeningHours opening={officeOpening} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('opening hours - party', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.openingHours.header} />
        <SectionContent>
          <OpeningHours opening={partyOpening} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('opening hours - wedding', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.openingHours.header} />
        <SectionContent>
          <OpeningHours opening={weddingOpening} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('photos', () => (
    <Container>
      <VenueSection>
        <SectionHeader
          isBlock
          text={sections.photos.header}
        />
        <SectionContent>
          <SectionPhotos images={imageData} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('pop up', () => (
    <Container>
      <VenuePopUp
        subtitle="subtitle"
        title="title"
      />
    </Container>
  ))
  .add('pop up (contact)', () => (
    <Container>
      <ContactPopUp
        subtitle="venue.contact_modal_subtitle"
        title="venue.contact_modal_title"
      />
    </Container>
  ))
  .add('pop up list column', () => (
    <Container>
      <InfoList
        subtitle="subtitle"
        title="title"
      />
    </Container>
  ))
  .add('pop up top', () => (
    <Container>
      <PopUpTop />
    </Container>
  ))
  .add('price and packages - dining', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.diningOffers.header} />
        <SectionContent>
          <SectionPrice packages={diningPackages} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('price and packages - meeting', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.meetingOffers.header} />
        <SectionContent>
          <SectionPrice packages={meetingPackages} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('price and packages - office', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.officeOffers.header} />
        <SectionContent>
          <SectionPrice packages={officePackages} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('price and packages - party', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.partyOffers.header} />
        <SectionContent>
          <SectionPrice packages={partyPackages} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('price and packages - wedding', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.weddingOffers.header} />
        <SectionContent>
          <SectionPrice packages={weddingPackages} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('reviews - meeting', () => (
    <Container>
      <VenueSection>
        <SectionHeader
          addTranslationButton
          isBlock
          isSticky
          rating={ratingData}
          text={sections.reviews.header}
          translateButtonText="venue.translate_review_button"
          withRating
        />
        <SectionContent>
          <RoomReviews
            inVenuePage
            per_page={7}
            rating={ratingData}
            reviews={reviewData.venue_reviews}
          />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('text', () => (
    <Container>
      <VenueSection>
        <SectionHeader text={sections.description.header} />
        <SectionContent>
          <SectionText text={sections.description.text} />
        </SectionContent>
      </VenueSection>
    </Container>
  ))
  .add('top - information', () => (
    <Container>
      <Info info={info} />
    </Container>
  ))
  .add('top - photos box', () => (
    <Container>
      <VenueTopPhotos images={imageData} />
    </Container>
  ))
  .add('top - title', () => (
    <Container>
      <Title
        addTranslationButton
        badges={badges}
        largeTitle={title.large}
        location={title.location}
        searchLink={title.searchLink}
        smallTitle={title.small}
      />
    </Container>
  ));
