import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  tr: {
    border: '1px solid #f2f2f2',
    verticalAlign: 'middle',
  },
  idColumn: {
    maxWidth: '100px',
  },
  tiny: {
    minWidth: '80px',
  },
  verySmall: {
    minWidth: '120px',
  },
  small: {
    minWidth: '140px',
  },
  medium: {
    minWidth: '180px',
  },
  large: {
    minWidth: '200px',
  },
  veryLarge: {
    minWidth: '250px',
  },
  huge: {
    minWidth: '300px',
  },
  massive: {
    minWidth: '400px',
  },
  setWidthColumn: {
    width: '1px',
  },
  smallScreenHiddenColumn: {
    display: 'none',
    '@media (min-width: 744px)': {
      display: 'table-cell',
    },
  },
  visibleColumnSmall: {
    '@media (min-width: 744px)': {
      width: '8.3333%',
    },
  },
  visibleColumnLarge: {
    '@media (min-width: 744px)': {
      width: '16.6667%',
    },
  },
  mainDisplayHead: {
    height: '80px',
    textAlign: 'left',
    minWidth: '176px',
    maxWidth: '176px',
  },
  displayCell: {
    borderBottom: '1px solid #ebebeb',
    height: '80px',
    textAlign: 'center',
    minWidth: '120px',
  },
  highlightedHead: {
    '@media (min-width: 744px)': {
      ':before': {
        content: '" "',
        boxShadow: 'inset 0px -10px 12px -6px rgba(219, 219, 219, 0.4)',
        display: 'block',
        height: '10px',
        width: 'calc(100% + 24px)',
        position: 'relative',
        top: '-34px',
        left: '-12px',
      },
    },
  },
  highlightedHeadInner: {
    '@media (min-width: 744px)': {
      marginTop: '-10px',
    },
  },
  followingHighlightedHead: {
    '@media (min-width: 744px)': {
      boxShadow: 'inset 8px 0 8px -4px rgba(219, 219, 219, 0.4)',
    },
  },
  descColumn: {
    height: '80px',
    maxWidth: '176px',
  },
  beforeHighlighted: {
    '@media (min-width: 744px)': {
      borderBottom: '1px solid #ebebeb',
      boxShadow: 'inset -8px 0 8px -4px rgba(219, 219, 219, 0.4)',
      maxWidth: '60%',
    },
  },
  highlightedCell: {
    '@media (min-width: 744px)': {
      ':after': {
        content: '" "',
        boxShadow: 'rgba(219, 219, 219, 0.4) 0px 12px 12px -6px inset',
        display: 'block',
        height: '10px',
        width: 'calc(100% + 24px)',
        position: 'relative',
        bottom: '-41px',
        left: '-12px',
      },
    },
  },
  highlightedCellInner: {
    '@media (min-width: 744px)': {
      marginBottom: '-10px',
    },
  },
});
