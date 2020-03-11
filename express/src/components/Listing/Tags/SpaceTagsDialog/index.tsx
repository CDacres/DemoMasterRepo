import * as React from 'react';
import { observer } from 'mobx-react';
// import { css } from 'aphrodite/no-important';

// Core
import { AssetImageEdge } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Row from '@src/components/Listing/Layout/Row';
import Strip from '@src/components/Listing/Layout/Strip';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import CheckboxInput from '@src/components/Listing/Form/CheckboxInput';
import FormControlLabel from '@src/components/Listing/Form/FormControlLabel';
import PhotoThumb from '@src/components/Listing/Photos/PhotoThumb';
import PhotoGrid from '@src/components/Listing/Photos/PhotoGrid';
import PhotoGridItem from '@src/components/Listing/Photos/PhotoGrid/PhotoGridItem';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import SpaceTagModel, { ExtendedEdge } from '@src/components/Listing/Models/SpaceTagModel';

type Props = {
  images: AssetImageEdge[];
  model: SpaceTagModel;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
};

@observer
class SpaceTagsDialog extends React.Component<Props> {

  handleSubmit = async () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit();
    }
  }

  render() {
    const { model, model: { items }, onClose, images } = this.props;
    const onInputCheckChange = (item: ExtendedEdge) => (_: any, checked: boolean) => {
      model.markTagActivity(item.tagId, checked);
    };
    if (!model) {
      return null;
    }
    let itemsFirstHalf = [];
    let itemsSecondHalf = [];
    if (items.length > 0) {
      const halfItems = Math.ceil(items.length / 2);
      itemsFirstHalf = items.slice(0, halfItems);
      itemsSecondHalf = items.slice(halfItems, items.length);
    }
    return (
      <Dialog
        onClose={onClose}
        open={true}
      >
        <DialogTitleSection
          onClose={onClose}
          title="common.edit"
        />
        <DialogContentSection>
          {images.any() &&
            <PhotoGrid>
              {images.orderBy(x => x.orderIndex).slice(0, 8).map((i, k) => (
                <PhotoGridItem key={k}>
                  <PhotoThumb
                    edge={i}
                    stylesArray={[styles.image]}
                  />
                </PhotoGridItem>
              ))}
            </PhotoGrid>
          }
          <Row gap="16px">
            <Strip>
              {itemsFirstHalf.map((item, index) => {
                if (index === 0) {
                  item.isActive = true;
                  model.markTagActivity(item.tagId, true);
                  // TODO: remove this hack when autotagging is happening + merge both map returns into new component
                }
                return (
                  <FormControlLabel
                    control={
                      <CheckboxInput
                        checked={item.isActive}
                        disabled={index === 0} // TODO: remove this hack when autotagging is happening
                        name="tag"
                        onChange={onInputCheckChange(item)}
                      />
                    }
                    key={index}
                    label={
                      <span>
                        <Spell word={item.description} />
                        {/* {item.fromAutoRule &&
                        <span className={css(styles.rule)}>
                          (from rules)
                          </span>
                        } */}
                      </span>
                    }
                    noMarginRight={true}
                  />
                );
              })}
            </Strip>
            <Strip>
              {itemsSecondHalf.map((item, index) => {
                return (
                  <FormControlLabel
                    control={
                      <CheckboxInput
                        checked={item.isActive}
                        name="tag"
                        onChange={onInputCheckChange(item)}
                      />
                    }
                    key={index}
                    label={
                      <span>
                        <Spell word={item.description} />
                        {/* {item.fromAutoRule &&
                        <span className={css(styles.rule)}>
                          (from rules)
                          </span>
                        } */}
                      </span>
                    }
                    noMarginRight={true}
                  />
                );
              })}
            </Strip>
          </Row>
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

export default SpaceTagsDialog;
