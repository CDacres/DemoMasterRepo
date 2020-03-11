/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Connectors
import { useConfig } from '@src/store/connectors';

// Core
import { Errors, GeoLocation } from '@src/core';
import { Address } from '@src/core/domain';
import { AddressTemplate } from '@src/core/meta';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import FormField from '@src/components/Listing/Form/FormField';
import MemoInput from '@src/components/Listing/Form/MemoInput';
import Editor from '@src/components/Listing/Editor';
import Headings from '@src/components/Listing/Titles/Headings';
import Expanded from '@src/components/Listing/Layout/Expanded';
import CityField from '@src/components/Listing/Venue/VenueLocationSection/CityField';
import CountryCodeField from '@src/components/Listing/Venue/VenueLocationSection/CountryCodeField';
import CountyField from '@src/components/Listing/Venue/VenueLocationSection/CountyField';
import ExtraField from '@src/components/Listing/Venue/VenueLocationSection/ExtraField';
import GeoInput from '@src/components/Listing/Venue/VenueLocationSection/GeoInput';
import NearbyPlaceWidget from '@src/components/Listing/Venue/VenueLocationSection/NearbyPlaceWidget';
import PostcodeField from '@src/components/Listing/Venue/VenueLocationSection/PostcodeField';
import StreetField from '@src/components/Listing/Venue/VenueLocationSection/StreetField';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueLocationModel } from '@src/components/Listing/Models';

// Types
import { Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
};

type State = {
  streetBiasBounds?: any;
};

@observer
class VenueLocationSection extends Editor<Props, State, VenueLocationModel> {

  state: State = { streetBiasBounds: null };

  handleCurrentPosition = geolocation => {
    const center = new google.maps.LatLng(
      geolocation.coords.latitude,
      geolocation.coords.longitude
    );
    const circle = new google.maps.Circle({
      center,
      radius: 10000,
    });
    const streetBiasBounds = circle.getBounds();
    this.setState({ streetBiasBounds });
  }

  componentDidMount() {
    const { config: { countryCode, defaultLocation }, model, model: { address } } = this.props;
    if (address.countryCode === '') {
      this.setCountryCode(countryCode.toUpperCase());
      model.setLocationCoords({ lat: Number(defaultLocation.lat), lng: Number(defaultLocation.lon) });
    }
    model.getCurrentLocation(this.handleCurrentPosition);
  }

  handleLocationChanged = async (coords: GeoLocation) => {
    const { model } = this.props;
    await model.setLocationCoords(coords);
  }

  handleCountryChanged = (e: any) => {
    this.setCountryCode(e.target.value);
  }

  setCountryCode = (countryCode: string) => {
    const { model, model: { address } } = this.props;
    model.setCountryCode(countryCode);
    model.applyChanges(address, { ['countryCode']: countryCode });
  }

  handleCityChanged = (address: Address) => (e: any) => {
    const { model } = this.props;
    model.applyChanges(address, { ['town']: e.target.value });
    model.applyChanges(address, { ['city']: e.target.value });
  }

  renderField(field: keyof Address, meta: AddressTemplate, expanded: boolean, address: Address, errors: Errors<Address>) {
    const { model, model: { country, countryDisplay, topCountries } } = this.props;
    const args = {
      expanded,
      value: address[field],
      error: errors[field],
      placeholder: meta.placeholders[field],
      required: meta.requiredFields.indexOf(field) !== -1,
    };

    switch (field) {
      case 'countryCode':
        return (
          <CountryCodeField
            displayValue={countryDisplay}
            items={country.items}
            onChange={this.handleCountryChanged}
            topItems={topCountries}
            {...args}
          />
        );
      case 'street':
        args.value = (address.autocomplete !== null && address.autocomplete !== '') ? address.autocomplete : address.formattedAddress;
        return (
          <StreetField
            biasBounds={this.state.streetBiasBounds}
            countryCode={address.countryCode}
            onValueChange={(autocomplete, placeId) => model.setLocationStreet(autocomplete, placeId)}
            {...args}
          />
        );
      case 'city':
        return (
          <CityField
            onChange={this.handleCityChanged(address)}
            {...args}
          />
        );
      case 'postcode':
        return (
          <PostcodeField
            onChange={this.onInputChange(address, 'postcode')}
            {...args}
          />
        );
      case 'county':
        return (
          <CountyField
            onChange={this.onInputChange(address, 'county')}
            {...args}
          />
        );
      case 'extra':
        return (
          <ExtraField
            onChange={this.onInputChange(address, 'extra')}
            {...args}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { model: { address, addressErrors, expand, expanded, meta, venue: { location } } } = this.props;
    const errors = addressErrors || {};
    return (
      <Section>
        <SectionSplit>
          <Headings tag="h2">
            <Spell word="listing.wheres_place_located" />
          </Headings>
          <Headings tag="h4">
            <Spell word="listing.address_details" />
          </Headings>
          <SectionContent>
            {this.renderField('countryCode', meta, expanded, address, errors)}
            <div className={css(styles.fieldContainer)}>
              {meta.fields.map(field => (
                <React.Fragment key={field}>
                  {this.renderField(field, meta, expanded, address, errors)}
                </React.Fragment>
              ))}
            </div>
            <FormField
              hidden={!expanded && !location.specialInstructions}
              label={<Spell word="listing.special_instructions_building" />}
            >
              <Expanded
                collapsed={
                  <Headings tag="h4">
                    {location.specialInstructions}
                  </Headings>
                }
                open={expanded}
              >
                <MemoInput
                  height="128px"
                  name="instructions"
                  onChange={this.onInputChange(location, 'specialInstructions')}
                  placeholder={<Spell word="listing.venue_instructions_placeholder" />}
                  value={location.specialInstructions}
                />
              </Expanded>
            </FormField>
            <Expanded open={expanded}>
              <div>
                <Headings tag="h3">
                  <Spell word="listing.map_pin" />
                </Headings>
                <Headings tag="h4">
                  <Spell word="listing.map_pin_adjust" />
                </Headings>
                <div className={css(margin.top_2)}>
                  <GeoInput
                    height="400px"
                    value={location.coords}
                    onChanged={this.handleLocationChanged}
                    zoom={18}
                  />
                  {location.nearbyPlaces &&
                    <div className={css(margin.top_2)}>
                      {location.nearbyPlaces.map((i, k) => (
                        <NearbyPlaceWidget
                          key={k}
                          meters={i.distance && i.distance.value || 0}
                          name={i.name}
                          types={i.types}
                        />
                      ))}
                    </div>
                  }
                </div>
              </div>
            </Expanded>
          </SectionContent>
        </SectionSplit>
        {!expanded &&
          <SectionContent>
            <div>
              <Button
                color="primary"
                hasBoldText={true}
                hasLargePadding={true}
                onClick={expand}
                variant="outlined"
              >
                <Spell
                  variant="inherit"
                  word="common.edit"
                />
              </Button>
            </div>
          </SectionContent>
        }
      </Section>
    );
  }
}

export default useConfig(VenueLocationSection);
