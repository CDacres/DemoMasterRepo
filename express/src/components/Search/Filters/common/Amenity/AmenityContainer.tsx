/* tslint:disable:max-line-length */
import * as React from 'react';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Utils
import { toggleArrayItem } from '@src/utils';

// Data
import { amenityOptions, cateringLicenceOptions, dietaryOptions, equipmentOptions, eveningEntertainmentOptions, officeOptions, otherOptions, venueStaffOptions } from '@src/data/search/amenity';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import AmenityComponent from '@src/components/Search/Filters/common/Amenity/AmenityComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  type?: string;
  values: State;
  verticalDataType: string;
};

type State = {
  amenities: string[];
};

class AmenityContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { amenities } } = props;
    this.state = { amenities };
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { amenities } = this.state;
    attachClearAction(this.clearFilter);
    if (amenities.length) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = (): void => {
    const { amenities } = this.state;
    this.props.setSearchParams({ amenities });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ amenities: [] });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { amenities } = this.state;
      setButtonText(`${this.translationHelper.get('search.filters_amenities')} · ${amenities.length}`);
    }
  }

  handleChange = (amenityId: string): void => {
    const { amenities } = this.state;
    const updatedAmenities = toggleArrayItem(amenities, amenityId);
    this.setState({ amenities: updatedAmenities }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  render() {
    const { isLarge, isLast, type, verticalDataType } = this.props;
    const { amenities } = this.state;
    let optionType = [];
    let headerTitle = '';
    switch (type) {
      case 'cateringLicence':

      optionType = cateringLicenceOptions[verticalDataType];
      headerTitle = 'common.catering_licence';
      break;

      case 'dietaryNeeds':

      optionType = dietaryOptions[verticalDataType];
      headerTitle = 'common.dietary_needs';
      break;

      case 'equipment':

      optionType = equipmentOptions[verticalDataType];
      headerTitle = 'common.equipment';
      break;

      case 'eveningEntertainment':

      optionType = eveningEntertainmentOptions[verticalDataType];
      headerTitle = 'common.evening_entertainment';
      break;

      case 'office':

      optionType = officeOptions[verticalDataType];
      headerTitle = 'common.office_amenities';
      break;

      case 'other':

      optionType = otherOptions[verticalDataType];
      headerTitle = 'common.other';
      break;

      case 'venueStaff':

      optionType = venueStaffOptions[verticalDataType];
      headerTitle = 'common.venue_staff';
      break;

      default:

      optionType = amenityOptions[verticalDataType];
      headerTitle = 'common.general_amenities';
      break;
    }
    return (
      <AmenityComponent
        amenities={amenities}
        amenityOptions={optionType}
        handleChange={this.handleChange}
        headerTitle={headerTitle}
        isLarge={isLarge}
        isLast={isLast}
        {...this.props}
      />
    );
  }
}

export default useLang(useSearch(AmenityContainer));
