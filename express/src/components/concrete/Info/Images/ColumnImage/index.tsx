import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import BaseImage from '@src/components/concrete/Info/Images/BaseImage';

type Props = {
  height: string;
  src: string;
  width: string;
};

const ColumnImage = ({ height, src, width }: Props) => (
  <div className={css(styles.container)}>
    <div className={css(styles.inner)}>
      <BaseImage
        height={height}
        src={src}
        width={width}
      />
    </div>
  </div>
);

export default ColumnImage;
