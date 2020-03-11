import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  inputWrapper: {
    border: '1px solid #dbdbdb',
    borderRadius: '2px',
    backgroundColor: '#ffffff',
    marginBottom: '8px',
    display: 'block',
    width: '100%',
  },
  inputContainer: {
    overflow: 'hidden',
  },
  input: {
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
    fontSize: '16px',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    border: '0px none',
    padding: '11px',
    width: '100%',
    height: '40px',
    outline: 'none',
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
});
