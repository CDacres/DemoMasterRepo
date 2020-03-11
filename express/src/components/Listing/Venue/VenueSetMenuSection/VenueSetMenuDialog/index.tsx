/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { css } from 'aphrodite/no-important';

// Core
import { EntryMode, Errors } from '@src/core';
import { SetMenu, SetMenuGroup, SetMenuSection } from '@src/core/domain';
import { setMenuSectionCatalog } from '@src/core/meta';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import Currency from '@src/components/Listing/Form/Currency';
import FormField from '@src/components/Listing/Form/FormField';
import FormFieldLabel from '@src/components/Listing/Form/FormFieldLabel';
import NumberInput from '@src/components/Listing/Form/NumberInput';
import TextInput from '@src/components/Listing/Form/TextInput';
import TrailIncludeVAT from '@src/components/Listing/Form/TrailIncludeVAT';
import Column from '@src/components/Listing/Layout/Column';
import Editor from '@src/components/Listing/Editor';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import VenueSetMenuGroup from '@src/components/Listing/Venue/VenueSetMenuSection/VenueSetMenuDialog/VenueSetMenuGroup';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { VenueSetMenuModel } from '@src/components/Listing/Models';

type Props = {
  entry: SetMenu;
  mode: EntryMode;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  open: boolean;
};

@observer
class VenueSetMenuDialog extends Editor<Props, {}, VenueSetMenuModel> {

  @observable errors: Errors<SetMenu> = null;
  @observable bySection: Record<SetMenuSection, { currentInclude: string }> = setMenuSectionCatalog.items.map(i => ({ id: i.id, currentInclude: '' })).mapBy(x => x.id);

  @action handleAdd = (group: SetMenuGroup) => (description: string) => {
    const { entry } = this.props;
    if (!entry || !group || !description) {
      return;
    }
    if (!description || entry.groups.any(g => g.items.any(i => i.description === description))) {
      return;
    }
    group.items.push({ description, orderIndex: group.items.length });
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
    this.errors = model.validateSetMenu(entry);
    if (!!this.errors) {
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  }

  @action handleDrop = ({ source, destination }: DropResult) => {
    if (!source || !source.droppableId || !destination || !destination.droppableId) {
      return;
    }
    const { entry } = this.props;
    const gs = entry.groups.first(x => x.section === source.droppableId);
    const gd = entry.groups.first(x => x.section === destination.droppableId);
    if (!gs || !gd) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const [removed] = gd.items.splice(source.index, 1);
      gd.items.splice(destination.index, 0, removed);
    } else {
      const item = gs.items[source.index];
      gs.items.splice(source.index, 1);
      gd.items.splice(destination.index, 0, item);
    }
  }

  render() {
    const { entry, mode, model: { currency }, open } = this.props;
    if (!entry) {
      return null;
    }
    const errors = this.errors || {};

    return (
      <Dialog
        maxWidth="xs"
        onClose={this.handleClose}
        open={open}
      >
        <DialogTitleSection
          onClose={this.handleClose}
          title={mode === 'CREATE' ? 'listing.set_menu_title_create' : 'listing.set_menu_title_update'}
        />
        <DialogContentSection>
          <Column gap="16px">
            <ValidationWrapper errors={errors.description}>
              <FormField
                error={errors.description}
                label={<Spell word="common.name" />}
                required={true}
              >
                <TextInput
                  errors={errors.description}
                  name="description"
                  onChange={this.onInputChange(entry, 'description')}
                  placeholder={<Spell word="listing.lunch_menu" />}
                  value={entry.description}
                />
              </FormField>
            </ValidationWrapper>
            <ValidationWrapper errors={errors.price}>
              <FormField
                error={errors.price}
                label={<Spell word="common.price" />}
                required={true}
              >
                <NumberInput
                  errors={errors.price}
                  leading={<Currency currency={currency} />}
                  name="price"
                  onValueChange={this.onNumberFloatChange(entry, 'price')}
                  placeholder="0"
                  trailing={<TrailIncludeVAT />}
                  value={entry.price}
                />
              </FormField>
            </ValidationWrapper>
            <FormFieldLabel>
              <Spell word="listing.includes_label" />
            </FormFieldLabel>
            <DragDropContext onDragEnd={this.handleDrop}>
              {entry.groups.map(group => (
                <Droppable
                  droppableId={group.section}
                  key={group.section}
                >
                  {({ innerRef, droppableProps, placeholder }) => (
                    <div
                      className={css(styles.container)}
                      ref={innerRef}
                      {...droppableProps}
                    >
                      <VenueSetMenuGroup
                        group={group}
                        key={group.section}
                        onAdd={this.handleAdd(group)}
                      >
                        {placeholder}
                      </VenueSetMenuGroup>
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
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

export default VenueSetMenuDialog;
