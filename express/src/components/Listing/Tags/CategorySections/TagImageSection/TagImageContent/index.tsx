import * as React from 'react';

// Core
import { AssetImageEdge, ListingsV1Space } from '@src/core/domain';
import { spaceKindCatalog } from '@src/core/meta';

// Components
import EagleVision from '@src/components/abstract/Permissions/EagleVision';
import EagleVisionOrForce from '@src/components/abstract/Permissions/EagleVisionOrForce';
import Column from '@src/components/Listing/Layout/Column';
import Headings from '@src/components/Listing/Titles/Headings';
import ImageSectionStrip from '@src/components/Listing/Photos/ImageSectionStrip';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import TagSection from '@src/components/Listing/Tags/CategorySections/TagImageSection/TagImageContent/TagSection';

// Models
import { SpaceTagModel, VenueModel } from '@src/components/Listing/Models';

// Types
import { ImageErrorProps, SortEndProps } from '@src/components/Listing/Photos/ImageSectionStrip';

export type TagImageMethods = {
  onAdded: (space: ListingsV1Space, files: File[]) => void;
  onEdit: (image: AssetImageEdge) => void;
  onRemove: (space: ListingsV1Space, image: AssetImageEdge) => void;
  onSorted: (props: SortEndProps & { space: ListingsV1Space }) => void;
};

export type TagImageParent = {
  parent: VenueModel;
};

export type ImageErrorProps = ImageErrorProps;

type Props = {
  space: ListingsV1Space;
} & ImageErrorProps & TagImageMethods & TagImageParent;

class TagImageContent extends React.Component<Props> {

  handleAdded = (space: ListingsV1Space) => (files: File[]) => {
    const { onAdded } = this.props;
    if (onAdded) {
      onAdded(space, files);
    }
  }

  handleRemoval = (space: ListingsV1Space) => (image: AssetImageEdge) => {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove(space, image);
    }
  }

  handleSort = (space: ListingsV1Space) => ({ oldIndex, newIndex }: SortEndProps) => {
    const { onSorted } = this.props;
    if (onSorted) {
      onSorted({ space, oldIndex, newIndex });
    }
  }

  render() {
    const { errors, onEdit, parent, space } = this.props;
    const spaceType = spaceKindCatalog.byId[space.kind];
    const tagModel = new SpaceTagModel(parent, space);
    const spaceImageError = (errors && errors.length > 0) ? errors.map(x => x.result) : [];
    return (
      <EagleVisionOrForce forced={spaceType.enablePictures}>
        <Column gap="8px">
          <Headings tag="h3">
            {space.name}
          </Headings>
          {spaceType.enablePictures &&
            <React.Fragment>
              <ValidationWrapper errors={spaceImageError}>
                <ImageSectionStrip
                  errors={errors}
                  images={space.images}
                  onAdded={this.handleAdded(space)}
                  onEdit={onEdit}
                  onRemove={this.handleRemoval(space)}
                  onSorted={this.handleSort(space)}
                />
                <FormFieldError errors={spaceImageError} />
              </ValidationWrapper>
            </React.Fragment>
          }
          <EagleVision>
            {parent.tags.count() > 0 ? (
              <TagSection model={tagModel} />
            ) : (
              <span>
                Loading tags. Please wait...
              </span>
            )}
          </EagleVision>
        </Column>
      </EagleVisionOrForce>
    );
  }
}

export default TagImageContent;
