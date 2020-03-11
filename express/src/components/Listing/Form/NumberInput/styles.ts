import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    border: specs.boxBorder,
    borderWidth: '2px',
    borderRadius: '4px',
    transition: 'border-color 300ms ease-in-out',
    backgroundColor: '#fff',
    height: '46px',
    overflow: 'hidden',
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
  inputCell: {
    paddingRight: '8px',
  },
  noLeadingInputCell: {
    paddingLeft: '8px',
  },
  input: {
    display: 'block',
    gridRow: '1',
    gridColumn: '1',
    boxShadow: 'none',
    outline: 'none',
    minWidth: '32px',
    border: '0px',
    color: specs.textColor,
    fontSize: specs.input.fontSize,
    lineHeight: specs.input.lineHeight,
    fontFamily: specs.fontFamily,
    fontWeight: 700,
  },
  placeholder: {
    color: specs.placeholderColor,
  },
});
