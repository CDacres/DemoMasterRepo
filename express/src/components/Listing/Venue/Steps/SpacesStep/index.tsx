/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { Ref, View } from '@src/core';

// Styles
import { pagestyles } from '@src/styles';

// Components
import { AccountSettings } from '@src/components/concrete/Icons/svgs';
import Column from '@src/components/Listing/Layout/Column';
import Divider from '@src/components/Listing/Layout/Divider';
import Headings from '@src/components/Listing/Titles/Headings';
import TabHeader from '@src/components/Listing/Titles/TabHeader';
import VenueSpaceSection from '@src/components/Listing/Venue/VenueSpaceSection';
import VenuePackageSection from '@src/components/Listing/Venue/VenuePackageSection';
import VenuePackageDialog from '@src/components/Listing/Venue/VenuePackageSection/VenuePackageDialog';
import ConfirmDialog from '@src/components/Listing/ConfirmDialog';
import SpaceDialog from '@src/components/Listing/Space/SpaceDialog';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';
import PlaceholderCard from '@src/components/Listing/Layout/Cards/PlaceholderCard';

// Models
import { VenueSpaceModel } from '@src/components/Listing/Models';

@observer
class SpacesStep extends View<VenueSpaceModel> {

  handleEdit = (spaceId: Ref) => async () => {
    const { model } = this.props;
    await model.editSpace(spaceId);
  }

  render() {
    const { model, model: { addSpace, groups, packageCancel, packageDeletionConfirm, packageDeletionConfirmCancel, packageDeletionConfirmSubmit, packageCurrent, packageMode, packageSubmit, spaceModel, venueSpaceErrors } } = this.props;
    if (spaceModel) {
      return (
        <SpaceDialog
          entry={spaceModel.space}
          model={spaceModel}
          onClose={() => model.closeSpace()}
        />
      );
    }
    const venueSpaceError = (venueSpaceErrors && venueSpaceErrors.length > 0) ? venueSpaceErrors.map(x => x.result) : [];
    return (
      <React.Fragment>
        <TabHeader
          addOnClick={addSpace}
          addWord="listing.add_a_space"
          subtitle="listing.space_desc"
          title="common.spaces"
        />
        {(groups.length === 0) ? (
          <ValidationWrapper errors={venueSpaceError}>
            <PlaceholderCard
              buttonText="listing.add_a_space"
              errors={venueSpaceError}
              icon={<AccountSettings stylesArray={[pagestyles.icon40, pagestyles.iconBlue]} />}
              onClick={addSpace}
              text="listing.add_a_space_placeholder"
            />
          </ValidationWrapper>
        ) : (
          <React.Fragment>
            {groups.map((group, index) => (
              <React.Fragment key={index}>
                {index !== 0 &&
                  <Divider />
                }
                <Section>
                  <SectionHeader>
                    <Headings tag="h2">
                      <Spell word={group.productCategory.description} />
                    </Headings>
                  </SectionHeader>
                  <SectionContent>
                    <Column gap="8px">
                      {group.spaces.map(space => (
                        <VenueSpaceSection
                          key={space.id}
                          model={model}
                          onEdit={this.handleEdit(space.id)}
                          space={space}
                        />
                      ))}
                    </Column>
                  </SectionContent>
                  <VenuePackageSection
                    group={group}
                    model={model}
                  />
                </Section>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
        <VenuePackageDialog
          entry={packageCurrent}
          mode={packageMode}
          model={model}
          onClose={packageCancel}
          onSubmit={packageSubmit}
          open={!!packageCurrent}
        />
        <ConfirmDialog
          onClose={packageDeletionConfirmCancel}
          onSubmit={packageDeletionConfirmSubmit}
          open={!!packageDeletionConfirm}
          text="listing.confirm_text"
          title="listing.confirm_title"
        />
      </React.Fragment>
    );
  }
}

export default SpacesStep;
