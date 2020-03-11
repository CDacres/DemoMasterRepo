import * as React from 'react';
import Dropzone from 'react-dropzone';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import DashedCard from '@src/components/Listing/Layout/Cards/DashedCard';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  accept: string[];
  maxSize: number;
  onRejected: (files: File[]) => void;
  onSelected: (files: File[]) => void;
};

class PhotoAnother extends React.Component<Props> {
  render() {
    const { accept, maxSize, onRejected, onSelected } = this.props;
    return (
      <Dropzone
        accept={accept}
        maxSize={maxSize}
        noKeyboard={true}
        onDrop={onSelected}
        onDropRejected={onRejected}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <DashedCard>
              <div className={css(styles.textSmall)}>
                <Spell word="listing.photo_or_drag_and_drop" />
              </div>
              <input
                {...getInputProps()}
                accept="image/*"
                className={css(pagestyles.none)}
                multiple={true}
                type="file"
              />
            </DashedCard>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default PhotoAnother;
