/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

// Components
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import FormTip from '@src/components/Listing/Form/FormTip';
import AddButton from '@src/components/Listing/Buttons/AddButton';
import Editor from '@src/components/Listing/Editor';
import Divider from '@src/components/Listing/Layout/Divider';
import Strip from '@src/components/Listing/Layout/Strip';
import Headings from '@src/components/Listing/Titles/Headings';
import SpacePriceCard from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard';
import SpacePriceDialog from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceDialog';
import ConfirmDialog from '@src/components/Listing/ConfirmDialog';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpacePriceModel } from '@src/components/Listing/Models';

type Props = {
  errors?: string[];
};

@observer
class SpaceEditorPrices extends Editor<Props, {}, SpacePriceModel> {

  @action handleShowPrices = () => {
    const { model } = this.props;
    model.showAvailablePrices = true;
  }

  @action handleClosePrices = () => {
    const { model } = this.props;
    model.showAvailablePrices = false;
  }

  render() {
    const { errors, model, model: { allowedPrices, canAddPrice, category, enabledPrices, priceDeletionConfirm, priceDeletionConfirmCancel, priceDeletionConfirmSubmit, showAvailablePrices } } = this.props;
    if (!enabledPrices) {
      return null;
    }
    return (
      <React.Fragment>
        <Divider />
        <Section>
          <Strip cols="1fr auto">
            <SectionHeader>
              <Headings tag="h2">
                <Spell word="common.price" />
              </Headings>
              <ValidationWrapper errors={errors}>
                <FormFieldError errors={errors} />
              </ValidationWrapper>
            </SectionHeader>
            {canAddPrice &&
              <Headings tag="h2">
                <AddButton onClick={this.handleShowPrices}>
                  <Spell
                    variant="inherit"
                    word="listing.add_price"
                  />
                </AddButton>
              </Headings>
            }
          </Strip>
          <SectionSplit>
            <SectionContent>
              {allowedPrices.map((i, k) => (
                <SpacePriceCard
                  key={k}
                  model={model}
                  price={i}
                />
              ))}
              <FormTip tip={<Spell word={category.tip} />} />
            </SectionContent>
          </SectionSplit>
          <SpacePriceDialog
            model={model}
            onClose={this.handleClosePrices}
            open={showAvailablePrices}
          />
          <ConfirmDialog
            onClose={priceDeletionConfirmCancel}
            onSubmit={priceDeletionConfirmSubmit}
            open={!!priceDeletionConfirm}
            text="listing.confirm_text"
            title="listing.confirm_title"
          />
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorPrices;
