import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { View } from '@src/core';

// Styles
import styles from './styles';

// Components
import TabHeader from '@src/components/Listing/Titles/TabHeader';
import Divider from '@src/components/Listing/Layout/Divider';
import Tabs from '@src/components/Listing/Venue/Tabs';
import VenueAmenitySection from '@src/components/Listing/Venue/VenueAmenitySection';
import VenueCarteSection from '@src/components/Listing/Venue/VenueCarteSection';
import VenueSetMenuSection from '@src/components/Listing/Venue/VenueSetMenuSection';
import Section from '@src/components/Listing/Sections/Section';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueModel } from '@src/components/Listing/Models';

@observer
class AmenitiesStep extends View<VenueModel> {

  handleSectionChange = (value: number) => {
    const { model } = this.props;
    model.amenityTab = value;
  }

  render() {
    const { model: { amenityBloc, amenityTab, carteBloc, setMenuBloc } } = this.props;
    const tabs = amenityBloc.amenitySectionMeta.items;
    const tab = amenityTab;

    const amenitySections = [];
    for (const amenityGroup of amenityBloc.amenityGroups) {
      if (tabs[tab].amenityGroupIds.contains(amenityGroup.amenityGroup.id)) {
        amenitySections.push(
          <VenueAmenitySection
            key={amenitySections.length}
            model={amenityBloc}
            {...amenityGroup}
          />
        );
      }
    }

    return (
      <React.Fragment>
        <TabHeader
          subtitle="listing.amenity_desc"
          title="listing.amenity_title"
        />
        <Section>
          <Tabs
            count={tabs.length}
            itemRender={i => <Spell word={tabs[i].description} />}
            onChanged={this.handleSectionChange}
            value={tab}
          />
          <div className={css(styles.container)}>
            {amenitySections}
            {tab === 1 &&
              <React.Fragment>
                <Divider />
                <VenueCarteSection model={carteBloc} />
                <Divider />
                <VenueSetMenuSection model={setMenuBloc} />
              </React.Fragment>
            }
          </div>
        </Section>
      </React.Fragment>
    );
  }
}

export default AmenitiesStep;
