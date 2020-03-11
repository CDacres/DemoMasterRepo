/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { View } from '@src/core';
import { AssetImageEdge, ListingsV1Space, VenueImageTypes } from '@src/core/domain';

// Components
import Headings from '@src/components/Listing/Titles/Headings';
import TabHeader from '@src/components/Listing/Titles/TabHeader';
import Bulb from '@src/components/Listing/Icons/Bulb';
import Divider from '@src/components/Listing/Layout/Divider';
import IconHint from '@src/components/Listing/IconHint';
import AssetImageDialog from '@src/components/Listing/Photos/AssetImageDialog';
import ImageSectionStrip from '@src/components/Listing/Photos/ImageSectionStrip';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import SectionTooltip from '@src/components/Listing/Sections/SectionTooltip';
import Spell from '@src/components/Listing/Translate/Spell';
import SpaceTagsDialog from '@src/components/Listing/Tags/SpaceTagsDialog';
import CategorySections from '@src/components/Listing/Tags/CategorySections';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';
import FormFieldError from '@src/components/Listing/Form/FormFieldError';

// Models
import { VenueImageModel } from '@src/components/Listing/Models';

@observer
class ImagesStep extends View<VenueImageModel> {

  handleVenueImageSort = (images: AssetImageEdge[]) => ({ oldIndex, newIndex }) => {
    const { model } = this.props;
    model.changeVenueImageOrder(images, oldIndex, newIndex);
  }

  handleFoodImageSort = (images: AssetImageEdge[]) => ({ oldIndex, newIndex }) => {
    const { model } = this.props;
    model.changeVenueImageOrder(images, oldIndex, newIndex);
  }

  handleSpaceImageSort = (sort: { space: ListingsV1Space; oldIndex: number; newIndex: number }) => {
    const { model } = this.props;
    model.changeSpaceImageOrder(sort.space, sort.oldIndex, sort.newIndex);
  }

  handleVenueImageRemoval = (images: AssetImageEdge[]) => (image: AssetImageEdge) => {
    const { model } = this.props;
    model.removeVenueImage(images, image);
  }

  handleSpaceImageRemoval = (space: ListingsV1Space, image: AssetImageEdge) => {
    const { model } = this.props;
    model.removeSpaceImage(space, image);
  }

  handleVenueImageAdded = (files: File[]) => {
    const { model } = this.props;
    model.addVenueImages(files, VenueImageTypes.ASSET);
  }

  handleFoodImageAdded = (files: File[]) => {
    const { model } = this.props;
    model.addVenueImages(files, VenueImageTypes.FOOD);
  }

  handleSpaceImageAdded = (space: ListingsV1Space, files: File[]) => {
    const { model } = this.props;
    model.addSpaceImages(space, files);
  }

  render() {
    const { model, model: { cancelCurrent, currentEdit, editCurrent, foodImages, parent, spaceImageErrors, submitCurrent, venueImageErrors, venueImages } } = this.props;
    const venueImageError = (venueImageErrors && venueImageErrors.length > 0) ? venueImageErrors.map(x => x.result) : [];
    return (
      <React.Fragment>
        <TabHeader
          subtitle="listing.image_desc"
          title="listing.building_photos"
        />
        <Section>
          <SectionSplit
            right={
              <SectionTooltip
                icon={<Bulb />}
                title="listing.image_tooltip_title"
              >
                <span>
                  <Spell word="listing.image_tooltip_line_1" />
                </span>
                <span>
                  <Spell word="listing.image_tooltip_line_2" />
                </span>
                <span>
                  <Spell word="listing.image_tooltip_line_3" />
                </span>
                <span>
                  <Spell word="listing.image_tooltip_line_4" />
                </span>
              </SectionTooltip>
            }
          >
            <SectionHeader
              tooltip={
                <IconHint
                  icon={<Bulb />}
                  text="listing.dummy_text"
                />
              }
            >
              <Headings tag="h2">
                <Spell word="listing.venue_images_title" />
              </Headings>
              <Headings tag="h4">
                <Spell word="listing.venue_images_subtitle" />
              </Headings>
            </SectionHeader>
            <SectionContent>
              <ValidationWrapper errors={venueImageError}>
                <ImageSectionStrip
                  errors={venueImageErrors}
                  images={venueImages}
                  onAdded={this.handleVenueImageAdded}
                  onEdit={editCurrent}
                  onRemove={this.handleVenueImageRemoval(venueImages)}
                  onSorted={this.handleVenueImageSort(venueImages)}
                />
                <FormFieldError errors={venueImageError} />
              </ValidationWrapper>
            </SectionContent>
          </SectionSplit>
        </Section>
        <CategorySections
          errors={spaceImageErrors}
          onAdded={this.handleSpaceImageAdded}
          onEdit={editCurrent}
          onRemove={this.handleSpaceImageRemoval}
          onSorted={this.handleSpaceImageSort}
          parent={parent}
        />
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
                <Spell word="listing.venue_food_images_title" />
              </Headings>
              <Headings tag="h4">
                <Spell word="listing.venue_food_images_subtitle" />
              </Headings>
            </SectionHeader>
            <SectionContent>
              <ImageSectionStrip
                images={foodImages}
                onAdded={this.handleFoodImageAdded}
                onEdit={editCurrent}
                onRemove={this.handleVenueImageRemoval(foodImages)}
                onSorted={this.handleFoodImageSort(foodImages)}
              />
            </SectionContent>
          </SectionSplit>
        </Section>
        {!!currentEdit &&
          <AssetImageDialog
            entry={currentEdit}
            model={model}
            onClose={cancelCurrent}
            onSubmit={submitCurrent}
            open={true}
          />
        }
        {!!parent.showSpaceTags &&
          <SpaceTagsDialog
            images={parent.currentSpaceForTags.images}
            model={parent.tagModel}
            onClose={parent.closeSpaceTagDialog}
            onSubmit={parent.submitSpaceTags}
          />
        }
      </React.Fragment>
    );
  }
}

export default ImagesStep;
