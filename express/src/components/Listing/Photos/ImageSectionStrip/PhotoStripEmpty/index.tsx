/* tslint:disable:max-line-length */
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { css } from 'aphrodite/no-important';

// Core
import { uid } from '@src/core';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import CloudUpload from '@src/components/Listing/Icons/CloudUpload';
import Spell from '@src/components/Listing/Translate/Spell';

export type ImageErrorProps = {
  errors?: Array<{
    id?: string;
    name?: string;
    result: string;
  }>;
};

type Props = {
  accept: string[];
  maxSize: number;
  onRejected: (files: File[]) => void;
  onSelected: (files: File[]) => void;
} & ImageErrorProps;

type State = {
  id: string;
};

class PhotoStripEmpty extends React.Component<Props, State> {
  state: State = { id: uid() };

  inputEl: HTMLInputElement = null;

  handleClick = () => {
    this.inputEl.click();
  }

  handleChange = () => {
    const { onSelected } = this.props;
    if (!onSelected || !this.inputEl.files || this.inputEl.files.length === 0) {
      return;
    }

    const files = [];
    for (let i = 0; i < this.inputEl.files.length; i++) {
      files.push(this.inputEl.files.item(i));
    }
    onSelected(files);
  }

  render() {
    const { accept, errors, maxSize, onRejected, onSelected } = this.props;
    const hasError = errors && errors.length > 0;
    return (
      <Dropzone
        accept={accept}
        maxSize={maxSize}
        noKeyboard={true}
        onDrop={onSelected}
        onDropRejected={onRejected}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={css(styles.container, padding.topbottom_1, padding.leftright_0, hasError && styles.containerError)}
          >
            <div className={css(styles.imgContainer)}>
              <img
                alt="placeholder"
                height="128px"
                src="/_express/images/commonsite/image_placeholder.png"
                width="1080px"
              />
            </div>
            <div className={css(styles.contentContainer)}>
              <div>
                <div className={css(styles.buttonContainer, padding.all_1_5)}>
                  <CloudUpload stylesArray={[styles.buttonIcon, margin.right_1]} />
                  <Spell
                    variant="inherit"
                    word="listing.upload_photos"
                  />
                </div>
                <input
                  {...getInputProps()}
                  accept="image/*"
                  className={css(pagestyles.none)}
                  multiple={true}
                  type="file"
                />
              </div>
              <Spell
                variant="inherit"
                word="listing.photo_or_drag_and_drop"
              />
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default PhotoStripEmpty;
