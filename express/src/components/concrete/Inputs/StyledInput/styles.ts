import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  inputWrapper: {
    display: 'block',
    width: '100%',
  },
  inputText: {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 'normal',
  },
  inputContainerInput: {
    zIndex: 0,
  },
  inputInnerWrapper: {
    backgroundColor: '#ffffff',
    position: 'relative',
    display: 'block',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ebebeb',
    borderRadius: '4px',
  },
  withBorder: {
    borderColor: '#ebebeb',
  },
  hiddenBorder: {
    borderColor: '#ffffff',
  },
  selectContainer: {
    overflow: 'hidden',
  },
  select: {
    appearance: 'none',
    padding: '11px 40px 11px 11px',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    border: 'medium none',
    borderRadius: '0px',
    textIndent: '0px',
    height: 'unset',
    display: 'block',
    width: '100%',
    ':focus': {
      outline: 'currentColor none medium',
    },
  },
  selectIconWrapper: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    lineHeight: 0,
    pointerEvents: 'none',
  },
  iconContainer: {
    visibility: 'visible',
    height: '46px',
    fontWeight: 600,
    paddingLeft: '11px',
  },
  iconInner: {
    display: 'table',
    position: 'relative',
    height: '100%',
  },
  focused: {
    borderColor: '#00c6ff',
  },
  inputInnerContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  input: {
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
    padding: '11px',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    width: '100%',
    border: '0px none',
    borderRadius: '2px',
    display: 'block',
    '::-webkit-input-placeholder': {
      color: '#717171',
    },
    '::-moz-placeholder': {
      color: '#717171',
    },
    ':-moz-placeholder': {
      color: '#717171',
    },
    ':-ms-input-placeholder': {
      color: '#717171',
    },
    '::placeholder': {
      color: '#717171',
    },
  },
  smallText: {
    fontSize: '14px',
    lineHeight: '22px',
    padding: '6px 7px',
    fontWeight: 600,
  },
});
