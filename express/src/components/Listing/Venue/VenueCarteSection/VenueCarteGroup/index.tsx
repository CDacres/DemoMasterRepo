import * as React from 'react';
import { observer } from 'mobx-react';
import { Draggable } from 'react-beautiful-dnd';
import { css } from 'aphrodite/no-important';

// Core
import { CarteMenu } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import TextInputAddButton from '@src/components/Listing/Buttons/TextInputAddButton';
import Column from '@src/components/Listing/Layout/Column';
import Divider from '@src/components/Listing/Layout/Divider';
import Strip from '@src/components/Listing/Layout/Strip';
import FormFieldLabel from '@src/components/Listing/Form/FormFieldLabel';
import FormTip from '@src/components/Listing/Form/FormTip';
import TextInput from '@src/components/Listing/Form/TextInput';
import TrailIncludeVAT from '@src/components/Listing/Form/TrailIncludeVAT';
import Editor from '@src/components/Listing/Editor';
import VenueCarteGroupItem from '@src/components/Listing/Venue/VenueCarteSection/VenueCarteGroup/VenueCarteGroupItem';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueCarteModel } from '@src/components/Listing/Models';

type Props = {
  group: CarteMenu;
};

type State = {
  itemDescription: string;
};

@observer
class VenueCarteGroup extends Editor<Props, State, VenueCarteModel> {

  state: State = { itemDescription: '' };

  protected input;

  constructor(props: Props) {
    super(props);
    this.input = React.createRef<HTMLInputElement>();
  }

  handleAdd = () => {
    const { group, model } = this.props;
    const { itemDescription } = this.state;
    if (!itemDescription) {
      return;
    }
    if (group.items.any(x => x.description === itemDescription)) {
      return;
    }
    model.addCarteItem(group, itemDescription);
    this.setState({ itemDescription: '' });
    this.input.current.focus();
  }

  render() {
    const { children, group, group: { carteGroup, items }, model, model: { currency } } = this.props;
    const { itemDescription } = this.state;
    return (
      <div className={css(styles.container)}>
        <Strip
          colGap="8px"
          cols="1fr 160px 24px"
          itemsHorz="stretch"
          itemsVert="center"
        >
          <FormFieldLabel>
            <Spell word={carteGroup.description} />
          </FormFieldLabel>
          {/*<FormFieldLabel>
            <Spell word="Happy" />
          </FormFieldLabel>*/}
          {(items.length > 0) &&
            <FormFieldLabel>
              <Spell word="common.price" />
              <TrailIncludeVAT wrapped={true} />
            </FormFieldLabel>
          }
        </Strip>
        <Divider />
        <Column
          gap="8px"
          margin="8px 0px"
        >
          {items.map((item, index) => (
            <Draggable
              draggableId={item.description}
              index={index}
              key={item.description}
            >
              {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                  ref={innerRef}
                  {...draggableProps}
                  {...dragHandleProps}
                >
                  <VenueCarteGroupItem
                    currency={currency}
                    entry={item}
                    group={group}
                    key={index}
                    model={model}
                    onRemove={() => model.removeCarteItem(group, item)}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </Column>
        {children}
        <Strip
          colGap="8px"
          cols="1fr 24px"
        >
          <TextInput
            name="description"
            onChange={e => this.setState({ itemDescription: e.currentTarget.value })}
            onEnter={this.handleAdd}
            placeholder={<Spell word={carteGroup.placeholder} />}
            ref={this.input}
            trailing={
              <TextInputAddButton
                disabled={!itemDescription}
                onClick={this.handleAdd}
              />
            }
            value={itemDescription}
          />
        </Strip>
        {carteGroup.tip ? (
          <FormTip tip={<Spell word={carteGroup.tip} />} />
        ) : (
          null
        )}
      </div>
    );
  }
}

export default VenueCarteGroup;
