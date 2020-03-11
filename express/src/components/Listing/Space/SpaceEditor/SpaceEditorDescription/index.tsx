import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { EntryEdit } from '@src/core';
import { ListingsV1Space } from '@src/core/domain';

// Components
import Bulb from '@src/components/Listing/Icons/Bulb';
import FormField from '@src/components/Listing/Form/FormField';
import MemoInput from '@src/components/Listing/Form/MemoInput';
import TextInput from '@src/components/Listing/Form/TextInput';
import IconHint from '@src/components/Listing/IconHint';
import Headings from '@src/components/Listing/Titles/Headings';
import Divider from '@src/components/Listing/Layout/Divider';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

@observer
class SpaceEditorDescription extends EntryEdit<ListingsV1Space, SpaceModel> {
  render() {
    const { entry, model: { kind, spaceErrors } } = this.props;
    if (!kind) {
      return null;
    }
    const errors = spaceErrors || {};
    return (
      <React.Fragment>
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
                <Spell word={`listing.${kind.id}_section_title`} />
              </Headings>
              <Headings tag="h4">
                <Spell word={`listing.${kind.id}_section_subtitle`} />
              </Headings>
            </SectionHeader>
            <SectionContent>
              <ValidationWrapper errors={errors.name}>
                <FormField
                  error={errors.name}
                  label={<Spell word={`listing.${kind.id}_name_label`} />}
                  required={true}
                >
                  <TextInput
                    errors={errors.name}
                    name="name"
                    onChange={this.handleChange('name')}
                    placeholder={<Spell word={`listing.${kind.id}_name_placeholder`} />}
                    value={entry.name}
                  />
                </FormField>
              </ValidationWrapper>
              <ValidationWrapper errors={errors.description}>
                <FormField
                  error={errors.description}
                  label={<Spell word={`listing.${kind.id}_description_label`} />}
                  required={true}
                  tip={<Spell word={`listing.${kind.id}_tip`} />}
                >
                  <MemoInput
                    errors={errors.description}
                    height="128px"
                    name="description"
                    onChange={this.handleChange('description')}
                    placeholder={<Spell word={`listing.${kind.id}_description_placeholder`} />}
                    value={entry.description}
                  />
                </FormField>
              </ValidationWrapper>
            </SectionContent>
          </SectionSplit>
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorDescription;
