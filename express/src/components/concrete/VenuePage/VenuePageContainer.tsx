/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import VenuePageComponent from '@src/components/concrete/VenuePage/VenuePageComponent';
import MiniMenu from '@src/components/concrete/Venue/MiniMenu';
import VenueTopPhotos from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos';
import TopInformationBox from '@src/components/concrete/Venue/VenueTop/TopInformationBox';
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
// import OpeningHours from '@src/components/concrete/OpeningHours';

// Data
import { badges, header, info, location, menu as menuData, navigation, sections, title } from '@src/data/venue/info'; // TODO: hardcoded data
import { pricePackages as partyPackages } from '@src/data/venue/party'; // TODO: hardcoded data
import { menu as meetingMenu, prices as meetingPrices, pricePackages as meetingPackages, rating as ratingData, reviews as reviewData } from '@src/data/venue/meeting'; // TODO: hardcoded data
import { images as imageData, pricePackages as officePackages } from '@src/data/venue/office'; // TODO: hardcoded data
import { pricePackages as diningPackages } from '@src/data/venue/dining'; // TODO: hardcoded data
import { amenities as amenityData, pricePackages as weddingPackages } from '@src/data/venue/wedding'; // TODO: hardcoded data

class VenuePageContainer extends React.Component {
  private amenities = React.createRef<HTMLDivElement>();
  private dining = React.createRef<HTMLDivElement>();
  private location = React.createRef<HTMLDivElement>();
  private meeting = React.createRef<HTMLDivElement>();
  private menu = React.createRef<HTMLDivElement>();
  private office = React.createRef<HTMLDivElement>();
  private overview = React.createRef<HTMLDivElement>();
  private party = React.createRef<HTMLDivElement>();
  private photos = React.createRef<HTMLDivElement>();
  private reviews = React.createRef<HTMLDivElement>();
  private wedding = React.createRef<HTMLDivElement>();

  constructor(props: {}) {
    super(props);
    this.setRef;
  }

  setRef = element => {
    this.amenities = element;
    this.dining = element;
    this.location = element;
    this.meeting = element;
    this.menu = element;
    this.office = element;
    this.overview = element;
    this.party = element;
    this.photos = element;
    this.reviews = element;
    this.wedding = element;
  }

  render() {
    return (
      <VenuePageComponent>
        <MiniMenu
          amenitiesRef={this.amenities}
          data={menuData}
          diningRef={this.dining}
          locationRef={this.location}
          meetingRef={this.meeting}
          menuRef={this.menu}
          officeRef={this.office}
          overviewRef={this.overview}
          partyRef={this.party}
          photosRef={this.photos}
          reviewsRef={this.reviews}
          weddingRef={this.wedding}
        />
        <VenueTopPhotos images={imageData} />
        <VenueSection
          innerRef={this.overview}
          topSection={true}
        >
          <TopInformationBox
            addTranslationButton={true}
            badges={badges}
            header={header}
            info={info}
            title={title}
          />
        </VenueSection>
        {/* TODO: add way to turn translationButton off */}
        <VenueSection isFirst={true}>
          <SectionHeader text={sections.description.header} />
          <SectionContent>
            <SectionText text={sections.description.text} />
          </SectionContent>
        </VenueSection>
        {officePackages &&
          <VenueSection innerRef={this.office}>
            <SectionHeader
              isSticky={true}
              text={sections.officeOffers.header}
            />
            <SectionContent>
              <SectionPrice packages={officePackages} />
            </SectionContent>
          </VenueSection>
        }
        {meetingPackages &&
          <VenueSection innerRef={this.meeting}>
            <SectionHeader
              isSticky={true}
              text={sections.meetingOffers.header}
            />
            <SectionContent>
              <SectionPrice packages={meetingPackages} />
            </SectionContent>
          </VenueSection>
        }
        {partyPackages &&
          <VenueSection innerRef={this.party}>
            <SectionHeader
              isSticky={true}
              text={sections.partyOffers.header}
            />
            <SectionContent>
              <SectionPrice packages={partyPackages} />
            </SectionContent>
          </VenueSection>
        }
        {diningPackages &&
          <VenueSection innerRef={this.dining}>
            <SectionHeader
              isSticky={true}
              text={sections.diningOffers.header}
            />
            <SectionContent>
              <SectionPrice packages={diningPackages} />
            </SectionContent>
          </VenueSection>
        }
        {weddingPackages &&
          <VenueSection innerRef={this.wedding}>
            <SectionHeader
              isSticky={true}
              text={sections.weddingOffers.header}
            />
            <SectionContent>
              <SectionPrice packages={weddingPackages} />
            </SectionContent>
          </VenueSection>
        }
        {meetingMenu &&
          <VenueSection innerRef={this.menu}>
            <SectionHeader
              isSticky={true}
              text={sections.menu.header}
            />
            <SectionContent>
              <RoomMenu
                currency={meetingPrices.currency}
                inVenuePage={true}
                menu={meetingMenu}
              />
            </SectionContent>
          </VenueSection>
        }
        {reviewData &&
          <VenueSection innerRef={this.reviews}>
            <SectionHeader
              addTranslationButton={true}
              isBlock={true}
              isSticky={true}
              rating={ratingData}
              text={sections.reviews.header}
              translateButtonText="venue.translate_review_button"
              withRating={true}
            />
            <SectionContent>
              <RoomReviews
                inVenuePage={true}
                per_page={7}
                rating={ratingData}
                reviews={reviewData.venue_reviews}
              />
            </SectionContent>
          </VenueSection>
        }
        {imageData &&
          <VenueSection innerRef={this.photos}>
            <SectionHeader
              isBlock={true}
              isSticky={true}
              text={sections.photos.header}
            />
            <SectionContent>
              <SectionPhotos images={imageData} />
            </SectionContent>
          </VenueSection>
        }
        {amenityData &&
          <VenueSection innerRef={this.amenities}>
            <SectionHeader
              isSticky={true}
              text={sections.amenities.header}
            />
            <SectionContent>
              <RoomAmenities
                amenities={amenityData}
                currency={meetingPrices.currency}
                inVenuePage={true}
              />
            </SectionContent>
          </VenueSection>
        }
        <VenueSection
          extras={
            <SectionMap location={location} />
          }
          innerRef={this.location}
        >
          <SectionHeader
            isSticky={true}
            text={sections.location.header}
          />
          <SectionContent>
            <SectionText text={sections.location.text} />
          </SectionContent>
        </VenueSection>
        {navigation &&
          <VenueSection isVertical={true}>
            <SectionHeader
              isVertical={true}
              text={sections.navigation.header}
            />
            <SectionContent isVertical={true}>
              <SectionNavigation navigation={navigation} />
            </SectionContent>
          </VenueSection>
        }
      </VenuePageComponent>
    );
  }
}

export default VenuePageContainer;
