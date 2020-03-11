import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    display: 'grid',
  },
  placeholder: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 1,
    pointerEvents: 'none',
    padding: '0px 8px',
    alignSelf: 'center',
    color: specs.placeholderColor,
    fontSize: specs.input.fontSize,
    lineHeight: specs.input.lineHeight,
    fontFamily: specs.fontFamily,
  },
  selected: {
    backgroundColor: specs.selectedBackground,
    color: specs.white,
  },
  suggestionContainer: {
    padding: '8px',
    cursor: 'pointer',
  },
  suggestionMain: {
    fontWeight: 700,
  },
  textInput: {
    display: 'block',
    padding: '8px',
    height: '46px',
    width: '100%',
    border: specs.boxBorder,
    borderWidth: '2px',
    borderRadius: specs.borderRadius,
    backgroundColor: '#fff',
    transition: 'border-color 300ms ease-in-out',
    color: specs.textColor,
    fontSize: specs.input.fontSize,
    lineHeight: specs.input.lineHeight,
    fontFamily: specs.fontFamily,
    boxShadow: 'none',
    outline: 'none',
    ':focus-within': {
      borderColor: specs.primary,
    },
    ':hover': {
      borderColor: specs.primary,
    },
  },
  containerError: {
    borderColor: specs.boxBorderError,
  },
});
