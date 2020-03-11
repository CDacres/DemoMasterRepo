/* tslint:disable:max-line-length */
import * as React from 'react';

// Data
import { adminInfo, amenities, assetTags, capacityRange, images, info, name, opening, location, pricePackages, prices, rating, reviews } from '@src/data/product/office';
import { types } from '@src/data/product/officeSidebar';

// Connectors
import { useRoom } from '@src/store/connectors';

// Components
import EagleVision from '@src/components/abstract/Permissions/EagleVision';
import RoomSummaryInfo from '@src/components/concrete/Product/RoomSummaryInfo';
import RoomHeaderImagesWrapper from '@src/components/concrete/Product/RoomHeaderImagesWrapper';
import RoomAdminCard from '@src/components/concrete/Product/RoomAdminCard';
import RoomAdminTags from '@src/components/concrete/Product/RoomAdminTags';
import RoomHighlightsCard from '@src/components/concrete/Product/RoomHighlightsCard';
import RoomDetails from '@src/components/concrete/Product/RoomDetails';
import RoomPriceAndPackages from '@src/components/concrete/Product/RoomPriceAndPackages';
import RoomAmenities from '@src/components/concrete/Product/RoomAmenities';
import RoomLocation from '@src/components/concrete/Product/RoomLocation';
import RoomOpenHoursSchedule from '@src/components/concrete/Product/RoomOpenHoursSchedule';
import RoomReviews from '@src/components/concrete/Product/RoomReviews';
import OfficeProductPageSidebar from '@src/components/concrete/Product/RHSidebars/OfficeProductPageSidebar';
import PageTemplate from '@src/components/concrete/Product/Pages/PageTemplate';

const OfficeProductPage = () => {
  // const { room } = this.props; // TODO: commented out until connected to api
  return (
    <PageTemplate
      buttonLabel="room.book_viewing"
      currency={prices.currency}
      price={{ hourly: prices.hourly_rate_formatted }}
      rating={rating.avg}
      reviews={rating.count}
      header={
        <RoomHeaderImagesWrapper
          images={images}
          name={name}
          review={reviews.venue_reviews[0]} // TODO: don't hard code which review to chose, get from api
          title="common.office"
        />
      }
      sidebar={
        <OfficeProductPageSidebar
          currency={prices.currency}
          key="sidebar"
          maxCapacity={capacityRange.max_capacity}
          minCapacity={capacityRange.min_capacity}
          price={{
            daily: prices.daily_rate_formatted,
            hourly: prices.hourly_rate_formatted,
            monthly: prices.monthly_rate_formatted,
          }}
          rating={rating.avg}
          reviews={rating.count}
          types={types}
        />
      }
    >
      <RoomSummaryInfo
        capacity={capacityRange}
        info={info}
        location={location}
        name={name}
        priceRange={prices}
        reviews={rating.count}
        title="common.office"
        titleHref="" // TODO: correct link
      />
      <EagleVision>
        <React.Fragment>
          <RoomAdminCard
            adminInfo={adminInfo}
            info={info}
          />
          <RoomAdminTags
            assetTags={assetTags}
            verticalId={info.vertical_id}
          />
        </React.Fragment>
      </EagleVision>
      <RoomHighlightsCard />
      <RoomDetails info={info} />
      <RoomPriceAndPackages
        options={pricePackages}
        title="room.pricing"
      />
      <RoomAmenities
        amenities={amenities}
        currency={prices.currency}
      />
      <RoomLocation location={location} />
      <RoomOpenHoursSchedule opening={opening} />
      <RoomReviews
        rating={rating}
        per_page={7}
        reviews={reviews.venue_reviews}
      />
    </PageTemplate>
  );
};

export default useRoom(OfficeProductPage);
