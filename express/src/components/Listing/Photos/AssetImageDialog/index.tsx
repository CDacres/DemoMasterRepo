import * as React from 'react';
import { css } from 'aphrodite/no-important';
import { observer } from 'mobx-react';

// Core
import { Model } from '@src/core';
import { AssetImageEdge } from '@src/core/domain';
import { specs } from '@src/core/ux';

// Styles
import styles from './styles';

// Components
import { expose, processImage } from '@src/components/Listing/Photos';
import PhotoCanvas from '@src/components/Listing/Photos/PhotoCanvas';
import Column from '@src/components/Listing/Layout/Column';
import Strip from '@src/components/Listing/Layout/Strip';
import Button from '@src/components/Listing/Buttons/Button';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import Slider from '@src/components/Listing/Slider';
import { CropInfo, Offset } from '@src/components/Listing/Photos/helpers';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  entry: AssetImageEdge;
  model: Model;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  open: boolean;
};

type State = {
  crop: Offset;
  cropInfo?: CropInfo;
  exposure: number;
  zoom: number;
};

const defaultState: State = {
  crop: { x: 0, y: 0 },
  cropInfo: null,
  exposure: 1,
  zoom: 1,
};

@observer
class AssetImageDialog extends React.Component<Props, State> {

  state: State = { ...defaultState };

  handleSubmit = async () => {
    const { entry, entry: { image: { urls: { thumbUrl } } }, model } = this.props;
    const { exposure } = this.state;
    const newImage = await processImage({
      src: thumbUrl,
      crop: this.state.cropInfo.pixels,
      filters: [(i) => expose(i, exposure)],
    });
    model.applyChanges(entry.image.urls, { thumbUrl: newImage });
    this.setState({ ...defaultState });

    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit();
    }
  }

  render() {
    const { entry, onClose, open } = this.props;
    const { crop, exposure, zoom } = this.state;
    return (
      <Dialog
        onClose={onClose}
        open={open}
      >
        <DialogTitleSection
          onClose={onClose}
          title="common.edit"
        />
        <DialogContentSection>
          <Column gap="16px">
            <div className={css(styles.container)}>
              <PhotoCanvas
                crop={crop}
                image={entry.image.urls.thumbUrl}
                onCropChange={newCrop => this.setState({ crop: newCrop })}
                onCropComplete={cropInfo => this.setState({ cropInfo })}
                onZoomChange={newZoom => this.setState({ zoom: newZoom })}
                styles={{
                  containerStyle: { backgroundColor: specs.background },
                  imageStyle: { filter: `brightness(${exposure * 100}%)` },
                }}
                zoom={zoom}
              />
            </div>
            <Strip
              colGap="16px"
              cols="auto 30% 1fr"
              margin="16px 0px"
            >
              <Spell word="listing.brightness" />
              <Slider
                max={3}
                min={0}
                onChange={(_, newExposure) => this.setState({ exposure: newExposure })}
                value={exposure}
              />
            </Strip>
          </Column>
        </DialogContentSection>
        <DialogActionSection>
          <Button onClick={onClose}>
            <Spell word="common.cancel" />
          </Button>
          <Button
            color="primary"
            onClick={this.handleSubmit}
          >
            <Spell word="common.save" />
          </Button>
        </DialogActionSection>
      </Dialog>
    );
  }
}

export default AssetImageDialog;
