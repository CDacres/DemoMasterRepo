import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { ProductCategory } from '@src/core/domain';

// Components
import ProductModel from '@src/components/concrete/Product/Pages/ProductModel';
import PageTemplate from '@src/components/concrete/Product/Pages/PageTemplate';
import RoomHeaderImagesWrapper from '@src/components/concrete/Product/RoomHeaderImagesWrapper';
import MeetingProductPageSidebar from '@src/components/concrete/Product/RHSidebars/MeetingProductPageSidebar';
import OfficeProductPageSidebar from '@src/components/concrete/Product/RHSidebars/OfficeProductPageSidebar';
import PartyProductPageSidebar from '@src/components/concrete/Product/RHSidebars/PartyProductPageSidebar';
import RoomSummaryInfo from '@src/components/concrete/Product/RoomSummaryInfo';
import RoomHighlightsCard from '@src/components/concrete/Product/RoomHighlightsCard';
import RoomDetails from '@src/components/concrete/Product/RoomDetails';
import RoomPriceAndPackages from '@src/components/concrete/Product/RoomPriceAndPackages';
import RoomAdminCard from '@src/components/concrete/Product/RoomAdminCard';
import RoomAdminTags from '@src/components/concrete/Product/RoomAdminTags';
import RoomExclusiveOffers from '@src/components/concrete/Product/RoomExclusiveOffers';
import RoomAmenities from '@src/components/concrete/Product/RoomAmenities';
import RoomMenu from '@src/components/concrete/Product/RoomMenu';
import RoomLocation from '@src/components/concrete/Product/RoomLocation';
import RoomOpenHoursSchedule from '@src/components/concrete/Product/RoomOpenHoursSchedule';
import RoomOtherSpaces from '@src/components/concrete/Product/RoomOtherSpaces';
import RoomReviews from '@src/components/concrete/Product/RoomReviews';
import { ProductSection } from '@src/components/concrete/Product/Pages/metadata';

// Data
import { images, name, prices, rating, reviews } from '@src/data/product/office';
import { capacityRange, siblings } from '@src/data/product/meeting';
import { types } from '@src/data/product/meetingSidebar';
import { exclusiveOffer } from '@src/data/product/party';

type ProductPageProps = {
  model?: ProductModel;
};

const Sidebar = ({ category }: { category: ProductCategory; model: ProductModel }) => {

  const data = {
    currency: prices.currency,
    maxCapacity: capacityRange.max_capacity,
    minCapacity: capacityRange.min_capacity,
    price: {
      daily: prices.daily_rate_formatted,
      hourly: prices.hourly_rate_formatted,
      monthly: prices.monthly_rate_formatted,
    },
    rating: rating.avg,
    reviews: rating.count,
    types: types,
  };

  switch (category) {
    case ProductCategory.OFFICE:
      return <OfficeProductPageSidebar {...data} />;
    case ProductCategory.MEETING:
      return <MeetingProductPageSidebar {...data} />;
    case ProductCategory.PARTY:
    case ProductCategory.DINING:
    case ProductCategory.WEDDING:
      return <PartyProductPageSidebar {...data} />;
    default:
      return null;
  }
};

const SummarySection = ({ model }: { model: ProductModel }) => (
  <RoomSummaryInfo {...model.summary} />
);

const DetailSection = ({ model }: { model: ProductModel }) => <RoomDetails {...model.details} />;
const OptionSection = ({ model }: { model: ProductModel }) => <RoomPriceAndPackages {...model.options} />;
const Exclusive = ({}: { model: ProductModel }) => <RoomExclusiveOffers exclusiveOffer={exclusiveOffer} />;

const AdminInfoSection = ({ model }: { model: ProductModel }) =>
  model.showAdminInfoSection ? <RoomAdminCard {...model.adminCard} /> : null;
const AdminTagSection = ({ model }: { model: ProductModel }) =>
  model.showAdminTagSection ? <RoomAdminTags {...model.adminTag} /> : null;

const AmenitySection = ({ model }: { model: ProductModel }) => <RoomAmenities {...model.amenitySection} />;
const HighlightSection = ({}: { model: ProductModel }) => <RoomHighlightsCard />;
const MenuSection = ({ model }: { model: ProductModel }) => <RoomMenu {...model.menuSectionProps} />;
const LocationSection = ({ model }: { model: ProductModel }) => <RoomLocation {...model.location} />;
const ScheduleSection = ({ model }: { model: ProductModel }) => <RoomOpenHoursSchedule {...model.schedule} />;
const OtherSpaceSection = ({}: { model: ProductModel }) => <RoomOtherSpaces spaces={siblings} />;

const ReviewSection = ({ model }: { model: ProductModel }) => (
  <RoomReviews
    per_page={7}
    rating={model.rating}
    reviews={model.reviews}
  />
);

const ProductSectionRelay = ({ section, model }: { section: ProductSection; model: ProductModel }) => {
  switch (section) {
    case ProductSection.Summary:
      return <SummarySection model={model} />;
    case ProductSection.AdminInfo:
      return <AdminInfoSection model={model} />;
    case ProductSection.AdminTag:
      return <AdminTagSection model={model} />;
    case ProductSection.Highlight:
      return <HighlightSection model={model} />;
    case ProductSection.Detail:
      return <DetailSection model={model} />;
    case ProductSection.Option:
      return <OptionSection model={model} />;
    case ProductSection.Exclusive:
      return <Exclusive model={model} />;
    case ProductSection.Amenity:
      return <AmenitySection model={model} />;
    case ProductSection.Menu:
      return <MenuSection model={model} />;
    case ProductSection.Location:
      return <LocationSection model={model} />;
    case ProductSection.Schedule:
      return <ScheduleSection model={model} />;
    case ProductSection.OtherSpace:
      return <OtherSpaceSection model={model} />;
    case ProductSection.Review:
      return <ReviewSection model={model} />;
    default:
      return null;
  }
};

@observer
export class ProductPage extends React.Component<ProductPageProps> {
  render() {
    const { model, model: { category } } = this.props;
    return (
      <PageTemplate
        buttonLabel={model.page.bookLabel}
        currency={prices.currency}
        header={
          <RoomHeaderImagesWrapper
            images={images}
            name={name}
            review={reviews.venue_reviews[0]}
            title="common.meeting"
          />
        }
        price={{ hourly: prices.hourly_rate_formatted }}
        rating={rating.avg}
        reviews={rating.count}
        sidebar={
          <Sidebar
            category={category}
            model={model}
          />
        }
      >
        {model.page.sections.map((section, index) => (
          <ProductSectionRelay
            key={index}
            model={model}
            section={section}
          />
        ))}
      </PageTemplate>
    );
  }
}
