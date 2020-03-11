/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { PriceModelMeta } from '@src/core/domain';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Column from '@src/components/Listing/Layout/Column';
import Divider from '@src/components/Listing/Layout/Divider';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import PriceModelOption from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceDialog/PriceModelOption';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { SpacePriceModel } from '@src/components/Listing/Models';

type Props = {
  model: SpacePriceModel;
  onClose: VoidFunction;
  open: boolean;
};

@observer
class SpacePriceDialog extends React.Component<Props> {

  handleAddPrice = (priceModel: PriceModelMeta) => () => {
    const { model } = this.props;
    model.showAvailablePrices = false;
    model.priceAdd(priceModel);
  }

  render() {
    const { model: { userPriceModels }, onClose, open } = this.props;
    return (
      <Dialog
        onClose={onClose}
        open={open}
      >
        <DialogTitleSection
          onClose={onClose}
          title="listing.available_prices"
        />
        <DialogContentSection>
          <Column gap="24px">
            {userPriceModels.map((i, k) => (
              <React.Fragment key={k}>
                {k === 0 ? null : <Divider />}
                <PriceModelOption
                  meta={i}
                  onClick={this.handleAddPrice(i)}
                />
              </React.Fragment>
            ))}
          </Column>
        </DialogContentSection>
        <DialogActionSection>
          <Button onClick={onClose}>
            <Spell word="common.cancel" />
          </Button>
        </DialogActionSection>
      </Dialog>
    );
  }
}

export default SpacePriceDialog;
