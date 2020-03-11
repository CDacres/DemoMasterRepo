import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { View } from '@src/core';
import { AmenityMeta, AmenityGroupMeta, VenueAmenity } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import Bulb from '@src/components/Listing/Icons/Bulb';
import Button from '@src/components/Listing/Buttons/Button';
import IconHint from '@src/components/Listing/IconHint';
import Headings from '@src/components/Listing/Titles/Headings';
import Divider from '@src/components/Listing/Layout/Divider';
import VenueAmenityCard from '@src/components/Listing/Venue/VenueAmenitySection/VenueAmenityCard';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueAmenityModel } from '@src/components/Listing/Models';

type Props = {
  amenityGroup: AmenityGroupMeta;
  items: Array<{
    amenity: AmenityMeta;
    link: VenueAmenity;
  }>;
  maxReached: boolean;
  summary: Array<{
    amenity: AmenityMeta;
    link: VenueAmenity;
  }>;
};

type State = {
  edit: boolean;
};

@observer
class VenueAmenitySection extends View<VenueAmenityModel, Props, State> {
  state: State = { edit: false };

  render() {
    const { amenityGroup, items, maxReached, model, model: { currency, spaces }, summary } = this.props;
    const edit = amenityGroup.expanded || this.state.edit;

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
            <div className={css(edit && styles.edit)}>
              {edit ? (
                <React.Fragment>
                  {items.map((i) => (
                    <VenueAmenityCard
                      amenity={i.amenity}
                      currency={currency}
                      disabled={maxReached && !i.link.isActive}
                      entry={i.link}
                      key={i.amenity.id}
                      model={model}
                      spaces={spaces}
                      setSpacesDirty={model.markSpacesDirty}
                    />
                  ))}
                </React.Fragment>
              ) : (
                <span>
                  {summary.map((i, k) => (
                    <React.Fragment key={k}>
                      <Spell word={i.amenity.description} />
                      {k !== summary.length - 1 &&
                        <React.Fragment>
                          {', '}
                        </React.Fragment>
                      }
                    </React.Fragment>
                  ))}
                </span>
              )}
            </div>
          </SectionContent>
          {!edit ? (
            <SectionContent>
              <div>
                <Button
                  color="primary"
                  hasBoldText={true}
                  hasLargePadding={true}
                  onClick={() => this.setState({ edit: true })}
                  variant="outlined"
                >
                  <Spell
                    variant="inherit"
                    word="common.edit"
                  />
                </Button>
              </div>
            </SectionContent>
          ) : (
            null
          )}
        </Section>
      </React.Fragment>
    );
  }
}

export default VenueAmenitySection;
