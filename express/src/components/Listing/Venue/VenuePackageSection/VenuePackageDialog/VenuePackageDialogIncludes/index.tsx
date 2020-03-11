import * as React from 'react';
import { observer } from 'mobx-react';
import { Draggable } from 'react-beautiful-dnd';

// Core
import { ProductItem, VenuePackage } from '@src/core/domain';

// Components
import Column from '@src/components/Listing/Layout/Column';
import DraggableItem from '@src/components/Listing/DraggableItem';

type Props = {
  entry: VenuePackage;
};

@observer
class VenuePackageDialogIncludes extends React.Component<Props> {

  handleRemoveItem = (item: ProductItem) => () => {
    const { entry } = this.props;
    entry.includes.remove(item);
  }

  render() {
    const { children, entry } = this.props;
    return (
      <React.Fragment>
        {entry.includes.any() &&
          <Column
            gap="8px"
            margin="8px 0px"
          >
            {entry.includes.map((item, index) => (
              <Draggable
                draggableId={item.description}
                index={index}
                key={item.description}
              >
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DraggableItem
                      description={item.description}
                      key={index}
                      onRemove={this.handleRemoveItem(item)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </Column>
        }
        {children}
      </React.Fragment>
    );
  }
}

export default VenuePackageDialogIncludes;
