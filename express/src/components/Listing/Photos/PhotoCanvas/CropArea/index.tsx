import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  cropAreaStyle?: React.CSSProperties;
  cropShape: 'round' | 'rect';
  showGrid?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

class CropArea extends React.Component<Props> {
  render() {
    const { children, cropShape, showGrid, ...props } = this.props;
    const round = cropShape === 'round';
    return (
      <div
        className={css(styles.cropperArea, round && styles.roundShape, showGrid && styles.gridLines)}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default CropArea;
