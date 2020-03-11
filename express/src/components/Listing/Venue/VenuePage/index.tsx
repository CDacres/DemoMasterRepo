/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import VenueOwner from '@src/components/abstract/Permissions/VenueOwner';
import Anchor from '@src/components/Listing/Buttons/Anchor';
import Button from '@src/components/Listing/Buttons/Button';
import URLGen from '@src/components/abstract/URLGen';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import Container from '@src/components/Listing/Layout/Container';
import Row from '@src/components/Listing/Layout/Row';
import PageHeader from '@src/components/Listing/Titles/PageHeader';
import Steps from '@src/components/Listing/Venue/Steps';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';
import VenueScheduleConflictDialog from '@src/components/Listing/Venue/VenuePage/VenueScheduleConflictDialog';
import StepItem from '@src/components/Listing/Venue/VenuePage/StepItem';
import SectionBack from '@src/components/Listing/Sections/SectionBack';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueModel } from '@src/components/Listing/Models';

type Props = {
  model: VenueModel;
  venueId: string;
};

type State = {
  buttonLoading: boolean;
};

@observer
class VenuePage extends React.Component<Props, State> {
  state: State = { buttonLoading: false };

  componentDidMount() {
    document.getElementById('nav').style.display = 'none';
    this.props.model.setup(this.props.venueId);
  }

  handleSaveVenue = () => {
    const { model } = this.props;
    this.setState({ buttonLoading: !this.state.buttonLoading });
    model.saveVenue(true).then(() => {
      this.setState({ buttonLoading: !this.state.buttonLoading });
    });
  }

  handleBackClick = (url: string) => () => {
    const { model } = this.props;
    model.saveVenue(false).then(() => {
      window.location.assign(url);
    });
  }

  render() {
    const { model, model: { back, canBack, cancelConflict, confirmScheduleConflict, currentStep, ready, showScheduleConflict, venue } } = this.props;
    const { buttonLoading } = this.state;
    if (!ready) {
      return <LoadingAnimation />;
    }
    if (!venue) {
      return toast.error(<Spell word="common.internal_error" />);
    }
    const steps = [
      { label: 'listing.basic_info' },
      { label: 'common.spaces' },
      { label: 'common.images' },
      { label: 'common.amenities' },
    ];
    return (
      <Container variant="page">
        <VenueOwner>
          <SectionBack>
            <URLGen url="/dashboard/listings">
              {url => (
                <Anchor onClick={this.handleBackClick(url)}>
                  <div className={css(styles.backDiv)}>
                    <Chevron
                      direction="left"
                      stylesArray={[styles.backIcon]}
                    />
                    <Spell word="listing.back_to_listings" />
                  </div>
                </Anchor>
              )}
            </URLGen>
          </SectionBack>
        </VenueOwner>
        <PageHeader
          title={venue.name || ''}
          trailing={
            <Button
              className={css(styles.button)}
              color="primary"
              hasBoldText={true}
              hasLargePadding={true}
              hasWhiteText={true}
              size="large"
              variant="contained"
              {...(!buttonLoading ? { onClick: this.handleSaveVenue } : {})}
            >
              {!buttonLoading ? (
                <Spell
                  variant="inherit"
                  word="listing.save_and_continue"
                />
              ) : (
                <LoadingAnimation
                  smallDot={true}
                  spacing="dotsWrapperButton"
                  whiteDot={true}
                />
              )}
            </Button>
          }
        />
        <ul className={css(styles.stepContainer)}>
          {steps.map((item, index) => (
            <StepItem
              index={index}
              key={index}
              model={model}
              title={<Spell word={item.label} />}
            />
          ))}
        </ul>
        <Steps
          currentStep={currentStep}
          model={model}
        />
        <Row
          style={{
            marginBottom: '16px',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div>
            {canBack &&
              <Button
                className={css(styles.button)}
                color="primary"
                hasBoldText={true}
                hasLargePadding={true}
                onClick={back}
                variant="outlined"
              >
                <Spell
                  variant="inherit"
                  word="common.back"
                />
              </Button>
            }
          </div>
          <div className={css(styles.container)}>
            <Button
              className={css(styles.button)}
              color="primary"
              hasBoldText={true}
              hasLargePadding={true}
              hasWhiteText={true}
              size="large"
              variant="contained"
              {...(!buttonLoading ? { onClick: this.handleSaveVenue } : {})}
            >
              {!buttonLoading ? (
                <Spell
                  variant="inherit"
                  word="listing.save_and_continue"
                />
              ) : (
                <LoadingAnimation
                  smallDot={true}
                  spacing="dotsWrapperButton"
                  whiteDot={true}
                />
              )}
            </Button>
          </div>
        </Row>
        <VenueScheduleConflictDialog
          model={model}
          onClose={cancelConflict}
          onSubmit={confirmScheduleConflict}
          open={showScheduleConflict}
        />
      </Container>
    );
  }
}

export default VenuePage;
