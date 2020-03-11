import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { css } from 'aphrodite/no-important';

// Core
import { View } from '@src/core';

// Styles
import styles from './styles';

// Components
import Split from '@src/components/Listing/Layout/Split';
import Headings from '@src/components/Listing/Titles/Headings';
import VenueCarteGroup from '@src/components/Listing/Venue/VenueCarteSection/VenueCarteGroup';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueCarteModel } from '@src/components/Listing/Models';

@observer
class VenueCarteSection extends View<VenueCarteModel> {
  @action handleDrop = ({ source, destination }: DropResult) => {
    if (!source || !source.droppableId || !destination || !destination.droppableId) {
      return;
    }
    const { model: { menus } } = this.props;
    const gs = menus.first(x => x.carteGroup.id === source.droppableId);
    const gd = menus.first(x => x.carteGroup.id === destination.droppableId);
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
    const { model, model: { menus } } = this.props;
    return (
      <Section>
        <SectionHeader>
          <Headings tag="h2">
            <Spell word="listing.food_and_drinks" />
          </Headings>
        </SectionHeader>
        <SectionContent>
          <Split
            style={{ gridGap: '64px' }}
            variant="s50l"
          >
            <DragDropContext onDragEnd={this.handleDrop}>
              {menus.map((menu, k) => (
                <Droppable
                  droppableId={menu.carteGroup.id}
                  key={k}
                >
                  {({ innerRef, droppableProps, placeholder }) => (
                    <div
                      className={css(styles.container)}
                      ref={innerRef}
                      {...droppableProps}
                    >
                      <VenueCarteGroup
                        group={menu}
                        key={k}
                        model={model}
                      >
                        {placeholder}
                      </VenueCarteGroup>
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </Split>
        </SectionContent>
      </Section>
    );
  }
}

export default VenueCarteSection;
