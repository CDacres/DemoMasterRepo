/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

// Connectors
import { useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Components
import AmenitiesStep from '@src/components/Listing/Venue/Steps/AmenitiesStep';
import BasicStep from '@src/components/Listing/Venue/Steps/BasicStep';
import ImagesStep from '@src/components/Listing/Venue/Steps/ImagesStep';
import SpacesStep from '@src/components/Listing/Venue/Steps/SpacesStep';

// Models
import { VenueModel } from '@src/components/Listing/Models';

// Types
import { Store } from '@src/typings/types';

type Props = {
  currentStep: number;
  lang: Store.Lang;
  model: VenueModel;
};

@observer
class Steps extends React.Component<Props> {

  protected translationHelper;
  protected toastId = null;

  constructor(props: Props) {
    super(props);
    this.translationHelper = new TranslationHelper({ messages: props.lang });
  }

  render() {
    const { currentStep, model, model: { imageBloc, imageBloc: { spaceImageErrors, venueImageErrors }, locationBloc: { addressErrors }, planBloc: { openingHoursErrors }, spaceBloc, spaceBloc: { venueSpaceErrors }, venueErrors } } = this.props;
    if (!toast.isActive(this.toastId)) {
      if (currentStep === 0 && (venueErrors !== null || addressErrors !== null || (openingHoursErrors !== null && openingHoursErrors.length > 0))) {
        this.toastId = toast.error(this.translationHelper.get('validation.missing_basic'));
      } else if (currentStep === 1 && (venueSpaceErrors !== null && venueSpaceErrors.length > 0)) {
        this.toastId = toast.error(this.translationHelper.get('validation.missing_spaces'));
      } else if (currentStep === 2) {
        if (venueImageErrors !== null && venueImageErrors.length > 0) {
          if (spaceImageErrors !== null && spaceImageErrors.length > 0) {
            this.toastId = toast.error(this.translationHelper.getAndReplace('validation.missing_venue_space_images', { spaces: spaceImageErrors.map(x => x.name).join(', ') }));
          } else {
            this.toastId = toast.error(this.translationHelper.get('validation.missing_venue_images'));
          }
        } else if (spaceImageErrors !== null && spaceImageErrors.length > 0) {
          this.toastId = toast.error(this.translationHelper.getAndReplace('validation.missing_space_images', { spaces: spaceImageErrors.map(x => x.name).join(', ') }));
        }
      }
    }
    return (
      <React.Fragment>
        {(currentStep === 0) ? (
          <BasicStep model={model} />
        ) : (currentStep === 1) ? (
          <SpacesStep model={spaceBloc} />
        ) : (currentStep === 2) ? (
          <ImagesStep model={imageBloc} />
        ) : (currentStep === 3) ? (
          <AmenitiesStep model={model} />
        ) : (
          null
        )}
      </React.Fragment>
    );
  }
}

export default useLang(Steps);
