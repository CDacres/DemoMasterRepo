import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Types
import { AlignmentProps } from '@src/components/Listing/Layout';

type Props = {
  children: React.ReactNode;
  crossAlignment?: AlignmentProps;
  gap?: number | string;
  mainAlignment?: AlignmentProps;
  padding?: number | string;
  style?: React.CSSProperties;
};

const Row = ({ children, crossAlignment, gap, mainAlignment, padding, style }: Props) => {
  const inlineStyle: React.CSSProperties = {};
  if (padding) {
    inlineStyle.padding = padding;
  }
  if (gap) {
    inlineStyle.columnGap = gap;
  }
  if (mainAlignment) {
    inlineStyle.justifyItems = mainAlignment;
  }
  if (crossAlignment) {
    inlineStyle.alignItems = crossAlignment;
  }
  return (
    <div
      className={css(styles.container)}
      style={{
        ...inlineStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Row;
