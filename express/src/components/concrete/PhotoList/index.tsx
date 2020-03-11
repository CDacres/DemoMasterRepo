import * as React from 'react';
import { css } from 'aphrodite/no-important';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// Styles
import styles from './styles';

// Components
import { ChildProps, FileInput } from '@src/components/abstract/FileInput';

type Image = {
  assetType: string;
  created: string;
  id: string;
  isFeatured: boolean;
  largeUrl: string;
  name: string;
  type: string;
  typeId: string;
};

type Props = {
  handleDeletePhoto: () => void;
  images: Image[];
  onFileUpload: () => void;
};

type State = {
  items: Image[];
};

class PhotoList extends React.PureComponent<Props, State> {
  state: State = { items: this.props.images };

  handleDragEnd = (result): void => {
    if (!result.destination) {
      return;
    }
    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({
      items,
    });
  }

  reorder = (list: Image[], startIndex: number, endIndex: number): Image[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  renderFileInput = ({ bindInputElement, handleFileUpload }: ChildProps): JSX.Element => (
    <input
      type="file"
      onChange={handleFileUpload}
      ref={bindInputElement}
      multiple={true}
    />
  )

  render() {
    const { handleDeletePhoto, onFileUpload } = this.props;
    return (
      <div className={css(styles.photoList)}>
        <div className={css(styles.dragList)}>
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable
              direction="horizontal"
              droppableId="droppable"
            >
              {providedList => (
                <div
                  className={css(styles.listContainer)}
                  ref={providedList.innerRef}
                  {...providedList.droppableProps}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {provided => (
                        <div
                          className={css(styles.listItem)}
                          ref={provided.innerRef}
                          style={{
                            backgroundImage: `url('${item.largeUrl}')`,
                            ...provided.draggableProps.style,
                          }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <button
                            className={css(styles.deleteButton)}
                            onClick={handleDeletePhoto}
                          >
                            ✖
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {providedList.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className={css(styles.addButtonContainer)}>
          <FileInput
            inputComponentClass={css(styles.addButton)}
            inputId="image_upload"
            inputName="images"
            onPostFile={onFileUpload}
          >
            {this.renderFileInput}
          </FileInput>
        </div>
      </div>
    );
  }
}

export default PhotoList;
