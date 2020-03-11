import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import DashboardItem from '@src/components/concrete/Dashboard/DashboardWrapper/DashboardItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import { PaymentsPayouts } from '@src/components/concrete/Icons/svgs';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import StarsList from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem/StarsList';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { reviews } from '@src/data/dashboard/review';

class AddReviews extends React.Component {

  submitReview = () => {
    // console.log("review submitted"); // TODO: make this a proper action
  }

  render() {
    return (
      <DashboardTemplate>
        <DashboardWrapper
          sideBar={
            <SidebarSimple
              icon={<PaymentsPayouts stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
              text="dashboard.payments_box_description"
              title="dashboard.payments_box_title"
            />
          }
          title="dashboard.reviews_personal_title"
        >
          <DashboardItem text="dashboard.reviews_venue_subtitle" />
          <React.Fragment>
            {reviews.map((item, index) => (
              <ListItem
                key={index}
                title={item}
              >
                <div className={css(margin.top_1, margin.bottom_3)}>
                  <StarsList />
                </div>
              </ListItem>
            ))}
          </React.Fragment>
          <ListItem title="dashboard.public_review">
            <div className={css(margin.topbottom_3)}>
              <StyledInput
                id="public_review"
                isBig={true}
                name="public_review"
              />
            </div>
          </ListItem>
          <ListItem
            buttonText="common.add"
            title="dashboard.private_review"
          >
            <div className={css(margin.topbottom_3)}>
              <StyledInput
                id="private_review"
                isBig={true}
                name="private_review"
              />
            </div>
          </ListItem>
          <div className={css(margin.topbottom_3)}>
            <Translatable content={{ transKey: 'common.send' }}>
              <StyledButton
                action={this.submitReview}
                buttonColor="primary"
                buttonStyle="updated"
              />
            </Translatable>
          </div>
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default AddReviews;
