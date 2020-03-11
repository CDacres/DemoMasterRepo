import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { View } from '@src/core';

// Styles
import styles from './styles';

// Components
import Bulb from '@src/components/Listing/Icons/Bulb';
import IconHint from '@src/components/Listing/IconHint';
import Headings from '@src/components/Listing/Titles/Headings';
import Divider from '@src/components/Listing/Layout/Divider';
import VenueAmenityCard from '@src/components/Listing/Venue/VenueAmenitySection/VenueAmenityCard';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { SpaceCuisineModel } from '@src/components/Listing/Models';

@observer
class SpaceEditorCuisine extends View<SpaceCuisineModel> {
  render() {
    const { model, model: { amenityGroup, currency, enabled, enabledMaxReached, items } } = this.props;
    if (!enabled) {
      return null;
    }
    return (
      <React.Fragment>
        <Divider />
        <Section>
          <SectionHeader
            tooltip={
              <IconHint
                icon={<Bulb />}
                text="listing.dummy_text"
              />
            }
          >
            <Headings tag="h2">
              <Spell word={amenityGroup.description} />
            </Headings>
            {!!amenityGroup.subtitle ? (
              <Headings tag="h4">
                <Spell word={amenityGroup.subtitle} />
              </Headings>
            ) : (
              null
            )}
          </SectionHeader>
          <SectionContent>
            <div className={css(styles.container)}>
              {items.map((i) => (
                <VenueAmenityCard
                  amenity={i.amenity}
                  currency={currency}
                  disabled={!i.isActive && enabledMaxReached}
                  entry={i}
                  key={i.amenity.id}
                  model={model}
                  spaces={[]}
                />
              ))}
            </div>
          </SectionContent>
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorCuisine;
