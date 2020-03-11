/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { View } from '@src/core';

// Components
import AddButton from '@src/components/Listing/Buttons/AddButton';
import Split from '@src/components/Listing/Layout/Split';
import Strip from '@src/components/Listing/Layout/Strip';
import Headings from '@src/components/Listing/Titles/Headings';
import SolidCard from '@src/components/Listing/Layout/Cards/SolidCard';
import VenueSetMenuDialog from '@src/components/Listing/Venue/VenueSetMenuSection/VenueSetMenuDialog';
import ConfirmDialog from '@src/components/Listing/ConfirmDialog';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueSetMenuModel } from '@src/components/Listing/Models';

@observer
class VenueSetMenuSection extends View<VenueSetMenuModel> {
  render() {
    const { model, model: { currency, items, menuCancel, menuCurrent, menuDeletionConfirm, menuDeletionConfirmCancel, menuDeletionConfirmSubmit, menuMode, menuSubmit } } = this.props;
    return (
      <div>
        <Section>
          <Strip cols="1fr auto">
            <SectionHeader>
              <Headings tag="h2">
                <Spell word="listing.set_menus_title" />
              </Headings>
            </SectionHeader>
            <Headings tag="h2">
              <AddButton onClick={() => model.menuCreate()}>
                <Spell
                  variant="inherit"
                  word="listing.set_menu_add"
                />
              </AddButton>
            </Headings>
          </Strip>
          <SectionContent>
            <Split variant="s33">
              {items.map(item => (
                <SolidCard
                  currency={currency}
                  isLarge={true}
                  item={item.description}
                  items={item.groups.many(x => (x.items || []))}
                  key={item.id}
                  onDelete={() => model.menuDelete(item)}
                  onEdit={() => model.menuEdit(item)}
                  price={item.price}
                />
              ))}
            </Split>
          </SectionContent>
        </Section>
        <VenueSetMenuDialog
          entry={menuCurrent}
          mode={menuMode}
          model={model}
          onClose={menuCancel}
          onSubmit={menuSubmit}
          open={!!menuCurrent}
        />
        <ConfirmDialog
          onClose={menuDeletionConfirmCancel}
          onSubmit={menuDeletionConfirmSubmit}
          open={!!menuDeletionConfirm}
          text="listing.confirm_text"
          title="listing.confirm_title"
        />
      </div>
    );
  }
}

export default VenueSetMenuSection;
