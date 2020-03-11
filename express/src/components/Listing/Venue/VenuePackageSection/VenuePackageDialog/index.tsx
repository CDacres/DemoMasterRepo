import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

// Core
import { Errors, ModelMode } from '@src/core';
import { VenuePackage } from '@src/core/domain';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import TextInputAddButton from '@src/components/Listing/Buttons/TextInputAddButton';
import Currency from '@src/components/Listing/Form/Currency';
import FormField from '@src/components/Listing/Form/FormField';
import NumberInput from '@src/components/Listing/Form/NumberInput';
import TextInput from '@src/components/Listing/Form/TextInput';
import TrailIncludeVAT from '@src/components/Listing/Form/TrailIncludeVAT';
import Editor from '@src/components/Listing/Editor';
import Column from '@src/components/Listing/Layout/Column';
import Strip from '@src/components/Listing/Layout/Strip';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import VenuePackageDialogIncludes from '@src/components/Listing/Venue/VenuePackageSection/VenuePackageDialog/VenuePackageDialogIncludes';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { VenueSpaceModel } from '@src/components/Listing/Models';

type Props = {
  entry: VenuePackage;
  mode: ModelMode;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  open: boolean;
};

@observer
class VenuePackageDialog extends Editor<Props, {}, VenueSpaceModel> {

  @observable currentInclude: string = '';
  @observable errors: Errors<VenuePackage> = null;

  protected input;

  constructor(props: Props) {
    super(props);
    this.input = React.createRef<HTMLInputElement>();
  }

  @action handleAddCurrent = () => {
    const { entry } = this.props;
    const description = this.currentInclude;
    if (!description) {
      return;
    }
    if (!description || entry.includes.find(i => i.description === description)) {
      return;
    }
    const orderIndex = null;
    entry.includes.push({ description, orderIndex });
    this.currentInclude = '';
    this.input.current.focus();
  }

  @action handleDrop = ({ source, destination }: DropResult) => {
    if (!source || !source.droppableId || !destination || !destination.droppableId) {
      return;
    }
    const { entry } = this.props;
    const gd = entry.includes;
    if (!gd) {
      return;
    }
    const [removed] = gd.splice(source.index, 1);
    gd.splice(destination.index, 0, removed);
  }

  handleClose = () => {
    const { onClose } = this.props;
    this.errors = null;
    if (onClose) {
      onClose();
    }
  }

  handleSubmit = () => {
    const { entry, model, onSubmit } = this.props;
    this.errors = model.validatePackage(entry);
    if (!!this.errors) {
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  }

  render() {
    const { entry, mode, open } = this.props;
    if (!entry) {
      return null;
    }
    const description = this.currentInclude;
    const errors = this.errors || {};
    return (
      <Dialog
        maxWidth="sm"
        onClose={this.handleClose}
        open={open}
      >
        <DialogTitleSection
          onClose={this.handleClose}
          title={mode === 'CREATE' ? 'listing.add_dialog_title' : 'listing.edit_dialog_title'}
        />
        <DialogContentSection>
          <Column gap="24px">
            <ValidationWrapper errors={errors.name}>
              <FormField
                error={errors.name}
                label={
                  <Spell
                    variant="field"
                    word="listing.name_label"
                  />
                }
                required={true}
              >
                <TextInput
                  errors={errors.name}
                  name="name"
                  onChange={this.onInputChange(entry, 'name')}
                  value={entry.name}
                />
              </FormField>
              </ValidationWrapper>
              <ValidationWrapper errors={errors.delegatePrice}>
                <FormField
                  error={errors.delegatePrice}
                  label={
                    <Spell
                      variant="field"
                      word="common.price"
                    />
                  }
                  required={true}
                >
                  <NumberInput
                    errors={errors.delegatePrice}
                    leading={<Currency currency={entry.currency} />}
                    name="price"
                    onValueChange={this.onNumberFloatChange(entry, 'delegatePrice')}
                    placeholder="0"
                    trailing={<TrailIncludeVAT />}
                    value={entry.delegatePrice}
                  />
                </FormField>
              </ValidationWrapper>
            <Strip
              col="1"
              itemsHorz="stretch"
              itemsVert="center"
              rowGap="8px"
            >
              <Spell
                variant="field"
                word="listing.includes_label"
              />
              <DragDropContext onDragEnd={this.handleDrop}>
                <Droppable droppableId="droppable">
                  {({ innerRef, droppableProps, placeholder }) => (
                    <div
                      ref={innerRef}
                      {...droppableProps}
                    >
                      <VenuePackageDialogIncludes entry={entry}>
                        {placeholder}
                      </VenuePackageDialogIncludes>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <TextInput
                name="description"
                onChange={e => this.currentInclude = e.target.value}
                onEnter={this.handleAddCurrent}
                ref={this.input}
                trailing={
                  <TextInputAddButton
                    disabled={!description}
                    onClick={this.handleAddCurrent}
                  />
                }
                value={description}
              />
            </Strip>
            <Spell
              variant="tip"
              word="listing.includes_tip"
            />
          </Column>
        </DialogContentSection>
        <DialogActionSection>
          <Button onClick={this.handleClose}>
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

export default VenuePackageDialog;
