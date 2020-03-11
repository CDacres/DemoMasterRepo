import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  selectContainer: {
    alignItems: 'stretch',
    padding: '8px 8px 8px 11px',
    minWidth: '80px',
    background: 'white',
    border: specs.boxBorder,
    borderRadius: '4px',
    borderWidth: '2px',
    backgroundColor: '#fff',
    transition: 'border-color 300ms',
    height: '46px',
    ':focus-within': {
      borderColor: specs.primary,
    },
    ':hover': {
      borderColor: specs.primary,
    },
    fontSize: specs.input.fontSize,
    lineHeight: specs.input.lineHeight,
  },
  containerError: {
    borderColor: specs.boxBorderError,
  },
  select: {
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    boxShadow: 'none',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    WebkitBorderRadius: '0px',
    color: specs.textColor,
    fontSize: specs.input.fontSize,
    lineHeight: specs.input.lineHeight,
    fontFamily: specs.fontFamily,
    gridColumn: 1,
    gridRow: 1,
  },
});
