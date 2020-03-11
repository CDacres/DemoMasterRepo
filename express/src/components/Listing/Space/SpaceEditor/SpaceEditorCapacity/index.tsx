import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { View } from '@src/core';

// Styles
import styles from './styles';

// Components
import Anchor from '@src/components/Listing/Buttons/Anchor';
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import Headings from '@src/components/Listing/Titles/Headings';
import Divider from '@src/components/Listing/Layout/Divider';
import SpaceConfigurationCard from '@src/components/Listing/Space/SpaceEditor/SpaceEditorCapacity/SpaceConfigurationCard';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpaceCapacityModel } from '@src/components/Listing/Models';

type Props = {
  errors?: string[];
};

@observer
class SpaceEditorCapacity extends View<SpaceCapacityModel, Props> {

  render() {
    const { errors, model, model: { expand, hasMore, visibleItems } } = this.props;
    if (!visibleItems.any()) {
      return null;
    }
    return (
      <React.Fragment>
        <Divider />
        <Section>
          <SectionHeader>
            <Headings tag="h2">
              <Spell word="listing.space_configuration_capacity" />
            </Headings>
            <ValidationWrapper errors={errors}>
              <FormFieldError errors={errors} />
            </ValidationWrapper>
          </SectionHeader>
          <SectionSplit>
            <SectionContent>
              <div className={css(styles.container)}>
                {visibleItems.map((i, k) => (
                  <SpaceConfigurationCard
                    key={k}
                    model={model}
                    spaceConfiguration={i}
                  />
                ))}
              </div>
              {hasMore ? (
                <Anchor onClick={expand}>
                  <Spell word="common.show_more" />
                </Anchor>
              ) : (
                null
              )}
            </SectionContent>
          </SectionSplit>
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorCapacity;
