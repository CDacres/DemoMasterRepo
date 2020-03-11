import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { Draggable } from 'react-beautiful-dnd';

// Core
import { SetMenuGroup, SetMenuItem } from '@src/core/domain';
import { setMenuSectionCatalog } from '@src/core/meta';

// Components
import TextInputAddButton from '@src/components/Listing/Buttons/TextInputAddButton';
import TextInput from '@src/components/Listing/Form/TextInput';
import Column from '@src/components/Listing/Layout/Column';
import MiddleText from '@src/components/Listing/Layout/MiddleText';
import DraggableItem from '@src/components/Listing/DraggableItem';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  group: SetMenuGroup;
  onAdd: (value: string) => void;
};

type State = {
  value: string;
};

@observer
class VenueSetMenuGroup extends React.Component<Props, State> {

  state: State = { value: '' };

  protected input;

  constructor(props: Props) {
    super(props);
    this.input = React.createRef<HTMLInputElement>();
  }

  @action removeItem = (item: SetMenuItem) => () => {
    const { group } = this.props;
    group.items.remove(item);
  }

  handleAdd = () => {
    const { onAdd } = this.props;
    const { value } = this.state;
    if (onAdd) {
      this.setState({ value: '' }, () => onAdd(value));
      this.input.current.focus();
    }
  }

  render() {
    const { children, group } = this.props;
    const { value } = this.state;
    const menuSection = setMenuSectionCatalog.byId[group.section];
    return (
      <React.Fragment>
        <MiddleText>
          <Spell word={menuSection.title} />
        </MiddleText>
        <Column
          gap="8px"
          margin="8px 0px"
        >
          {group.items.map((item, index) => (
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
                  <DraggableItem
                    description={item.description}
                    key={index}
                    onRemove={this.removeItem(item)}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </Column>
        {children}
        <TextInput
          name="description"
          onChange={e => this.setState({ value: e.target.value })}
          onEnter={this.handleAdd}
          placeholder={<Spell word={menuSection.placeholder} />}
          ref={this.input}
          trailing={
            <TextInputAddButton
              disabled={!value}
              onClick={this.handleAdd}
            />
          }
          value={value}
        />
      </React.Fragment>
    );
  }
}

export default VenueSetMenuGroup;
