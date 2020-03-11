import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { css } from 'aphrodite/no-important';

// Core
import { Errors, Ref } from '@src/core';
import { AmenityMeta, ListingsV1Space, VenueAmenity } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import Editor from '@src/components/Listing/Editor';
import Button from '@src/components/Listing/Buttons/Button';
import CheckboxInput from '@src/components/Listing/Form/CheckboxInput';
import Currency from '@src/components/Listing/Form/Currency';
import FormControlLabel from '@src/components/Listing/Form/FormControlLabel';
import FormField from '@src/components/Listing/Form/FormField';
import MemoInput from '@src/components/Listing/Form/MemoInput';
import NumberInput from '@src/components/Listing/Form/NumberInput';
import SwitchInput from '@src/components/Listing/Form/SwitchInput';
import TextAdornment from '@src/components/Listing/Form/TextAdornment';
import Column from '@src/components/Listing/Layout/Column';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

type Props = {
  amenity: AmenityMeta;
  currency: string;
  entry: VenueAmenity;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  open: boolean;
  setSpacesDirty?: VoidFunction;
  spaces: ListingsV1Space[];
};

@observer
class VenueAmenityDialog extends Editor<Props> {

  @observable errors: Errors<VenueAmenity> = null;

  handleLinkSpace = (spaceId: Ref) => (_, checked: boolean) => {
    const { entry, setSpacesDirty } = this.props;
    if (setSpacesDirty) {
      setSpacesDirty();
    }
    if (checked) {
      entry.excludedSpaces.remove(spaceId);
    }
    if (!checked && entry.excludedSpaces.indexOf(spaceId) === -1) {
      entry.excludedSpaces.push(spaceId);
    }
  }

  @action
  handleAvailableToggle = (_, checked: boolean) => {
    const { entry } = this.props;
    if (checked) {
      entry.restrictAvailability = false;
    } else {
      entry.restrictAvailability = true;
    }
  }

  handleSubmit = () => {
    const { entry, onSubmit } = this.props;
    this.errors = this.validateAmenity(entry);
    if (!!this.errors) {
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  }

  validateAmenity = (entry) => {
    if (entry.amenity.isPriceable && entry.price.value < 0) {
      return {
        price: ['validation.price_invalid'],
      };
    }
    return null;
  }

  render() {
    const { amenity, currency, entry, onClose, open, spaces } = this.props;
    if (!entry) {
      return null;
    }
    const spaceIds = entry.excludedSpaces || [];
    const errors = this.errors || {};
    return (
      <Dialog
        onClose={onClose}
        open={open}
      >
        <DialogTitleSection
          onClose={onClose}
          title={amenity.description}
        />
        <DialogContentSection>
          <Column
            gap="16px"
            padding="16px 0px"
          >
            {amenity.isPriceable ? (
              <React.Fragment>
                <ValidationWrapper errors={errors.price}>
                  <FormField
                    error={errors.price}
                    label={<Spell word="common.price" />}
                  >
                    <NumberInput
                      errors={errors.price}
                      leading={<Currency currency={currency} />}
                      name="price"
                      onValueChange={this.onNumberFloatChange(entry.price, 'value')}
                      placeholder="0"
                      trailing={(entry.price && !entry.price.value) &&
                        <TextAdornment
                          hasEqualPadding={true}
                          text={<Spell word="common.included" />}
                        />
                      }
                      value={entry.price.value}
                    />
                  </FormField>
                </ValidationWrapper>
              </React.Fragment>
            ) : (
              null
            )}
            <FormField label={<Spell word="common.description" />}>
              <MemoInput
                height="128px"
                name="description"
                onChange={this.onInputChange(entry, 'note')}
                value={entry.note}
              />
            </FormField>
            {(amenity.isCustomisable && spaces.any()) ? (
              <React.Fragment>
                <FormControlLabel
                  control={
                    <CheckboxInput
                      checked={!entry.restrictAvailability}
                      name="spaces"
                      onChange={this.handleAvailableToggle}
                    />
                  }
                  label={<Spell word="listing.amenity_available_all_spaces" />}
                />
                {entry.restrictAvailability ? (
                  <Column
                    style={{
                      maxHeight: '300px',
                      overflowY: 'scroll',
                    }}
                  >
                    {spaces.map((i, k) => (
                      <FormControlLabel
                        className={css(styles.label)}
                        control={
                          <SwitchInput
                            checked={spaceIds.indexOf(i.id) === -1}
                            name="space"
                            onChange={this.handleLinkSpace(i.id)}
                          />
                        }
                        key={k}
                        label={i.name}
                        labelPlacement="start"
                        noMarginLeft={true}
                        noMarginRight={true}
                      />
                    ))}
                  </Column>
                ) : (
                  null
                )}
              </React.Fragment>
            ) : (
              null
            )}
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

export default VenueAmenityDialog;
