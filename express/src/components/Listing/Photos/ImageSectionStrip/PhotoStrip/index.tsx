import * as React from 'react';
import { SortableContainer, SortableElement, SortEnd, SortEndHandler } from 'react-sortable-hoc';

// Components
import PhotoGrid from '@src/components/Listing/Photos/PhotoGrid';
import PhotoGridItem from '@src/components/Listing/Photos/PhotoGrid/PhotoGridItem';

const SortableItem = SortableElement(({ value }) => (
  <PhotoGridItem>
    {value}
  </PhotoGridItem>
));

const SortableList = SortableContainer(({ items, trailing }) => (
  <PhotoGrid>
    {items.map((i, k) => (
      <SortableItem
        index={k}
        key={`item-${k}`}
        value={i}
      />
    ))}
    {trailing}
  </PhotoGrid>
));

export type SortEndProps = {
  newIndex: number;
  oldIndex: number;
};

type Props = {
  items: any[];
  onSortEnd: (sorting: SortEndProps) => void;
  trailing: React.ReactNode;
};

const PhotoStrip = ({ items, onSortEnd, trailing }: Props) => {
  const ourSortEnd: SortEndHandler = (sorting: SortEnd) => {
    onSortEnd({
      newIndex: sorting.newIndex,
      oldIndex: sorting.oldIndex,
    });
  };
  return (
    <div>
      <SortableList
        axis="xy"
        distance={2}
        items={items}
        onSortEnd={ourSortEnd}
        trailing={trailing}
      />
    </div>
  );
};

export default PhotoStrip;
