/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';

// Components
import Bulb from '@src/components/Listing/Icons/Bulb';
import FormField from '@src/components/Listing/Form/FormField';
import MemoInput from '@src/components/Listing/Form/MemoInput';
import SelectInput from '@src/components/Listing/Form/SelectInput';
import TextInput from '@src/components/Listing/Form/TextInput';
import SelectOption from '@src/components/Listing/Form/SelectInput/SelectOption';
import IconHint from '@src/components/Listing/IconHint';
import Editor from '@src/components/Listing/Editor';
import Divider from '@src/components/Listing/Layout/Divider';
import Strip from '@src/components/Listing/Layout/Strip';
import Headings from '@src/components/Listing/Titles/Headings';
import VenueLocationSection from '@src/components/Listing/Venue/VenueLocationSection';
import VenuePlanSection from '@src/components/Listing/Venue/VenuePlanSection';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Spell from '@src/components/Listing/Translate/Spell';
import SpellRender from '@src/components/Listing/Translate/SpellRender';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { VenueModel } from '@src/components/Listing/Models';

@observer
class BasicStep extends Editor<{}, {}, VenueModel> {
  render() {
    const { model: { formatWebsite, locationBloc, planBloc, venue, venueErrors, venueTypeMeta, websiteError } } = this.props;
    const errors = venueErrors || {};
    return (
      <Strip>
        <Section>
          <SectionSplit>
            <SectionHeader>
              <Headings tag="h2">
                <Spell word="listing.building_details" />
              </Headings>
              <Headings tag="h4">
                <Spell word="listing.provide_basic_building_info" />
              </Headings>
            </SectionHeader>
            <SectionContent>
              <ValidationWrapper errors={errors.name}>
                <FormField
                  error={errors.name}
                  label={<Spell word="listing.building_name" />}
                  required={true}
                  sublabel={<Spell word="listing.venue_name_instructions" />}
                  tip={<Spell word="listing.venue_name_tip" />}
                >
                  <TextInput
                    errors={errors.name}
                    name="name"
                    onChange={this.onInputChange(venue, 'name')}
                    value={venue.name}
                  />
                </FormField>
              </ValidationWrapper>
              <ValidationWrapper errors={errors.venueTypeId}>
                <FormField
                  error={errors.venueTypeId}
                  label={<Spell word="listing.building_primary_usage" />}
                  required={true}
                >
                  <SelectInput
                    errors={errors.venueTypeId}
                    name="type"
                    onChange={this.onInputChange(venue, 'venueTypeId')}
                    value={venue.venueTypeId || ''}
                  >
                    <SelectOption disabled={true} />
                    {venueTypeMeta.items.map((i, k) => (
                      <SpellRender
                        key={k}
                        render={(t) => <SelectOption value={i.id}>{t.get(i.description)}</SelectOption>}
                      />
                    ))}
                  </SelectInput>
                </FormField>
              </ValidationWrapper>
              <ValidationWrapper errors={websiteError}>
                <FormField
                  error={websiteError}
                  label={<Spell word="listing.website" />}
                >
                  <TextInput
                    errors={websiteError}
                    name="website"
                    onBlur={formatWebsite}
                    onChange={this.onInputChange(venue, 'website')}
                    value={venue.website}
                  />
                </FormField>
              </ValidationWrapper>
            </SectionContent>
          </SectionSplit>
        </Section>
        <Divider />
        <Section>
          <SectionSplit>
            <SectionHeader
              tooltip={
                <IconHint
                  icon={<Bulb />}
                  text="listing.dummy_text"
                />
              }
            >
              <Headings tag="h2">
                <Spell word="common.description" />
              </Headings>
            </SectionHeader>
            <SectionContent>
              <ValidationWrapper errors={errors.description}>
                <FormField
                  error={errors.description}
                  label={<Spell word="listing.building_description" />}
                  required={true}
                  sublabel={<Spell word="listing.building_desc_sublabel" />}
                  tip={<Spell word="listing.building_tip" />}
                >
                  <MemoInput
                    errors={errors.description}
                    height="156px"
                    name="description"
                    onChange={this.onInputChange(venue, 'description')}
                    placeholder={<Spell word={`listing.building_desc_placeholder`} />}
                    value={venue.description}
                  />
                </FormField>
              </ValidationWrapper>
            </SectionContent>
          </SectionSplit>
        </Section>
        <Divider />
        <VenueLocationSection model={locationBloc} />
        <Divider />
        <VenuePlanSection model={planBloc} />
      </Strip>
    );
  }
}

export default BasicStep;
