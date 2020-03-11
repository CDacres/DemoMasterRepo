import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Types
import { AlignmentProps } from '@src/components/Listing/Layout';

type Props = {
  children: React.ReactNode;
  // horizontal
  crossAlignment?: AlignmentProps;
  gap?: number | string;
  // vertical
  mainAlignment?: AlignmentProps;
  margin?: number | string;
  padding?: number | string;
  style?: React.CSSProperties;
};

const Column = ({ children, crossAlignment, gap, mainAlignment, margin, padding, style }: Props) => {
  const inlineStyle: React.CSSProperties = {};
  if (padding) {
    inlineStyle.padding = padding;
  }
  if (gap) {
    inlineStyle.rowGap = gap;
  }
  if (mainAlignment) {
    inlineStyle.alignItems = mainAlignment;
  }
  if (crossAlignment) {
    inlineStyle.justifyItems = crossAlignment;
  }
  if (margin) {
    inlineStyle.margin = margin;
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

export default Column;
