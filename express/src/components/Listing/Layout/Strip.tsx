/* tslint:disable:max-line-length */
import * as React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  col?: string | number;
  colGap?: string;
  cols?: string;
  height?: string | number;
  horz?: string;
  itemsHorz?: string;
  itemsVert?: string;
  margin?: string | number;
  onClick?: VoidFunction;
  overflow?: 'hidden' | string;
  padding?: string | number;
  row?: string | number;
  rowGap?: string;
  rows?: string;
  style?: React.CSSProperties;
  vert?: string;
  width?: string | number;
  zIndex?: number;
} & React.HTMLAttributes<HTMLElement>;

const Strip = ({ children, className, col, colGap, cols, height, horz, itemsHorz, itemsVert, margin, onClick, overflow, padding, row, rowGap, rows, style, vert, width, zIndex }: Props) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      ...style,
      display: 'grid',
      gridTemplateColumns: cols || '1fr',
      gridColumnGap: colGap,
      gridTemplateRows: rows,
      gridRowGap: rowGap,
      gridColumn: col,
      gridRow: row,
      alignItems: itemsVert || 'center',
      justifyItems: itemsHorz || 'stretch',
      alignSelf: vert,
      justifySelf: horz,
      padding: padding,
      margin: margin,
      width: width,
      height: height,
      overflow: overflow,
      zIndex: zIndex,
    }}
  >
    {children}
  </div>
);

export default Strip;
