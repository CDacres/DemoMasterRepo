import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import CloseButton from '@src/components/Listing/Buttons/CloseButton';
import Strip from '@src/components/Listing/Layout/Strip';
import DragIndicator from '@src/components/Listing/Icons/DragIndicator';

type Props = {
  description: string;
  onRemove: VoidFunction;
};

const DraggableItem = ({ description, onRemove }: Props) => (
  <div className={css(styles.root)}>
    <Strip cols="auto 1fr auto">
      <DragIndicator />
      <span>
        {description}
      </span>
      <CloseButton onClick={onRemove} />
    </Strip>
  </div>
);

export default DraggableItem;
