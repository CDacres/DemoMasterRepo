/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import CheckoutLeftSide from '@src/components/concrete/Checkout/CheckoutLeftSide';
import Date from '@src/components/concrete/Checkout/CheckoutLeftSide/Date';
import ServiceRating from '@src/components/concrete/Checkout/CheckoutLeftSide/ServiceRating';
import SuccessIcon from '@src/components/concrete/Checkout/CheckoutLeftSide/SuccessIcon';
import SummaryInfo from '@src/components/concrete/Checkout/CheckoutLeftSide/SummaryInfo';
import Title from '@src/components/concrete/Checkout/CheckoutLeftSide/Title';
import WarningBox from '@src/components/concrete/Checkout/CheckoutLeftSide/WarningBox';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import MapBoxMap from '@src/components/concrete/Map/MapBoxMap';
import { People, Phone } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Data
import { dates, info, steps } from '@src/data/checkout/info';

type Props = {
  id: string;
  onClick: () => void;
};

type State = {
  buttonDisabled: boolean;
};

class SummaryStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { buttonDisabled: true };
  }

  canButtonBeEnabled = (serviceRating): void => {
    if (serviceRating < 0 || serviceRating > 10) {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  }

  render() {
    const { id, onClick } = this.props;
    const { buttonDisabled } = this.state;
    return (
      <CheckoutLeftSide>
        <Title text={steps.summary.title} />
        <div className={css(margin.bottom_3)}>
          <SuccessIcon />
        </div>
        <WarningBox text={info.summaryWarning} />
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
        <ContentSeparator marginNum={2} />
        <div className={css(margin.topbottom_4)}>
          <div>
            <div className={css(margin.topbottom_2)}>
              <section>
                <GenericHeader
                  stylesArray={[pagestyles.defaultTitle]}
                  tag="h2"
                >
                  <Translatable content={{ transKey: 'checkout.payments_booking_confirmed_heading', count: 1, replacements: { number: id } }}>
                    <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                  </Translatable>
                </GenericHeader>
              </section>
            </div>
          </div>
        </div>
        <div>
          <SummaryInfo text={info.summaryPhone}>
            <Phone stylesArray={[pagestyles.icon, pagestyles.icon24, pagestyles.iconBlack]} />
          </SummaryInfo>
          <SummaryInfo text={info.summaryPeople}>
            <People stylesArray={[pagestyles.icon, pagestyles.icon24, pagestyles.iconBlack]} />
          </SummaryInfo>
        </div>
        <div className={css(margin.topbottom_4)}>
          <div>
            <div className={css(margin.topbottom_2)}>
              <section>
                <GenericHeader
                  stylesArray={[pagestyles.defaultTitle]}
                  tag="h2"
                >
                  <Translatable content={{ transKey: 'common.map' }}>
                    <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                  </Translatable>
                </GenericHeader>
              </section>
            </div>
          </div>
          <MapBoxMap
            height={567}
            lat={51.528308} // TODO: remove hardcoded
            lon={-0.3817765} // TODO: remove hardcoded
            showMarker={false}
            width={1140}
          />
        </div>
        <div className={css(margin.topbottom_4)}>
          <div>
            <div className={css(margin.topbottom_2)}>
              <section>
                <GenericHeader
                  stylesArray={[pagestyles.defaultTitle]}
                  tag="h2"
                >
                  <Translatable content={{ transKey: 'checkout.service_rating_title' }}>
                    <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                  </Translatable>
                </GenericHeader>
              </section>
            </div>
          </div>
          <ServiceRating canButtonBeEnabled={this.canButtonBeEnabled} />
        </div>
        <div>
          <div>
            <div className={css(margin.topbottom_8)}>
              <div>
                <div>
                  <Translatable content={{ transKey: steps.summary.buttonText }}>
                    <StyledButton
                      action={onClick}
                      buttonColor="primary"
                      buttonStyle="updated"
                      disabled={buttonDisabled}
                    />
                  </Translatable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CheckoutLeftSide>
    );
  }
}

export default SummaryStep;
