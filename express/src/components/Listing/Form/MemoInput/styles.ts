import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    transition: 'border-color 300ms',
    border: specs.boxBorder,
    borderRadius: '4px',
    borderWidth: '2px',
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
  textArea: {
    display: 'block',
    width: '100%',
    color: specs.textColor,
    fontSize: specs.input.fontSize,
    lineHeight: specs.input.lineHeight,
    fontFamily: specs.fontFamily,
    outline: 'none',
    border: '0px',
    boxShadow: 'none',
    padding: '8px',
  },
  placeholder: {
    color: specs.placeholderColor,
    margin: '8px',
  },
  grid: {
    gridColumn: '1',
    gridRow: '1',
  },
});
