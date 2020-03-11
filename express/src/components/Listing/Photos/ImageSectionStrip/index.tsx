/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

// Connectors
import { useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Core
import { AssetImageEdge } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import PhotoStrip from '@src/components/Listing/Photos/ImageSectionStrip/PhotoStrip';
import PhotoAnother from '@src/components/Listing/Photos/ImageSectionStrip/PhotoAnother';
import PhotoStripEmpty from '@src/components/Listing/Photos/ImageSectionStrip/PhotoStripEmpty';
import PhotoThumb from '@src/components/Listing/Photos/PhotoThumb';

// Types
import { Store } from '@src/typings/types';
import { SortEndProps as ChildSort } from '@src/components/Listing/Photos/ImageSectionStrip/PhotoStrip';
import { ImageErrorProps as ChildError } from '@src/components/Listing/Photos/ImageSectionStrip/PhotoStripEmpty';

export type SortEndProps = ChildSort;
export type ImageErrorProps = ChildError;

type Methods = {
  onAdded: (files: File[]) => void;
  onEdit: (image: AssetImageEdge) => void;
  onRemove: (image: AssetImageEdge) => void;
  onSorted: (oldNew: SortEndProps) => void;
};

type Props = {
  images: AssetImageEdge[];
  lang: Store.Lang;
} & ImageErrorProps & Methods;

@observer
class ImageSectionStrip extends React.Component<Props> {

  protected translationHelper;
  protected acceptTypes = ['image/jpeg', 'image/png'];
  protected maxSize = 8000000;

  constructor(props: Props) {
    super(props);
    this.translationHelper = new TranslationHelper({ messages: props.lang });
  }

  handleEdit = (image: AssetImageEdge) => () => {
    const { onEdit } = this.props;
    if (onEdit) {
      onEdit(image);
    }
  }

  handleRejection = (files: File[]) => {
    files.forEach(file => {
      if (this.acceptTypes.indexOf(file.type) === -1) {
        toast.error(this.translationHelper.get('validation.error_image_type'));
      } else if (file.size > this.maxSize) {
        toast.error(this.translationHelper.getAndReplace('validation.error_image_size', { size: this.maxSize / 1000000 }));
      }
    });
  }

  render() {
    const { errors, images, onAdded, onRemove, onSorted } = this.props;
    return (
      <div>
        {(!!images && images.any()) ? (
          <PhotoStrip
            items={images.orderBy(x => x.orderIndex).map((i, k) => (
              <PhotoThumb
                allowDownload={true}
                edge={i}
                isCover={k === 0}
                key={k}
                onEdit={this.handleEdit(i)}
                onRemove={onRemove}
                orderIndex={k}
                stylesArray={[styles.image]}
              />
            ))}
            onSortEnd={onSorted}
            trailing={
              <PhotoAnother
                accept={this.acceptTypes}
                maxSize={this.maxSize}
                onRejected={this.handleRejection}
                onSelected={onAdded}
              />
            }
          />
        ) : (
          <PhotoStripEmpty
            accept={this.acceptTypes}
            errors={errors}
            maxSize={this.maxSize}
            onRejected={this.handleRejection}
            onSelected={onAdded}
          />
        )}
      </div>
    );
  }
}

export default useLang(ImageSectionStrip);
