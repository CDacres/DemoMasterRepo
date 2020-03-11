import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import Tabs from '@src/components/concrete/Tabs';
import ReviewItem from '@src/components/concrete/Product/RoomReviews/ReviewItem';
import Reviews from '@src/components/concrete/Product/RoomReviews';
import { Book } from '@src/components/concrete/Icons/svgs';
import ReviewTable from '@src/components/concrete/Tables/ReviewTable';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';
import { rating as ratingData, reviews as reviewData } from '@src/data/venue/meeting'; // TODO: hardcoded data
import { tabs } from '@src/data/dashboard/tabs';

// Types
import { RoomReviews } from '@src/typings/types';

type Props = {
  rating?: RoomReviews.ReviewRating;
};

type State = {
  tabIndex: number;
};

class Review extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  handleTabChange = (tab: number): void => {
    this.setState({ tabIndex: tab });
  }

  render() {
    const { rating } = this.props;
    const { tabIndex } = this.state;
    return (
      <DashboardTemplate>
        <DashboardWrapper
          breadcrumbItems={breadcrumbs.reviews}
          sideBar={
            <SidebarSimple
              icon={<Book stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
              text="dashboard.taxes_box_description"
              title="dashboard.taxes_box_title"
            />
          }
          tabs={
            <Tabs
              handleClick={this.handleTabChange}
              items={tabs.reviews}
              tabIndex={tabIndex}
            />
          }
          title="common.reviews_title"
        >
          <React.Fragment>
            {tabIndex === 0 ? (
              <React.Fragment>
                <DashboardItem
                  text="dashboard.review_rating_subtitle"
                  title="dashboard.review_rating_title"
                />
                <div className={css(margin.bottom_3)}>
                  <ReviewItem rating={rating} />
                </div>
                <DashboardItem
                  firstButtonEvent={() => {}} // TODO: make this a proper action
                  firstButtonText="dashboard.send_review_invite"
                  secondButtonEvent={() => {}} // TODO: make this a proper action
                  secondButtonText="dashboard.send_bulk_review_invite"
                  text="dashboard.review_invite_subtitle"
                  title="dashboard.review_invite_title"
                />
                <DashboardItem title="common.reviews_title" />
                <Reviews
                  inVenuePage={true}
                  per_page={7}
                  rating={ratingData}
                  reviews={reviewData.venue_reviews}
                />
              </React.Fragment>
            ) : (tabIndex === 1 ? (
              <React.Fragment>
                <DashboardItem title="dashboard.reviews_i_wrote" />
                <Reviews
                  inVenuePage={true}
                  per_page={7}
                  rating={ratingData}
                  reviews={reviewData.venue_reviews}
                />
              </React.Fragment>
            ) : (tabIndex === 2 ? (
              <div>
                <DashboardItem
                  firstButtonEvent={() => {}} // TODO: make this a proper action
                  firstButtonText="dashboard.send_review_invite"
                  secondButtonEvent={() => {}} // TODO: make this a proper action
                  secondButtonText="dashboard.send_bulk_review_invite"
                  text="dashboard.review_invite_subtitle"
                  title="dashboard.review_invite_title"
                />
                <DashboardItem title="dashboard.review_button" />
                <ReviewTable />
              </div>
            ) : (
              null
            )))}
          </React.Fragment>
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default Review;
