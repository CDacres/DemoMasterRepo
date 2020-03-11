import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
    height: 'fit-content',
  },
  area: {
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
    border: '1px solid rgba(48, 48, 48, 0.5)',
    width: '100%',
    outline: 'none',
    resize: 'none',
    height: '200px',
    fontSize: '18px',
    color: '#303030',
    padding: '5px',
    '::-webkit-input-placeholder': {
      padding: '50px 30px 0px 20px',
      fontSize: '19px',
      color: '#717171',
    },
    '::-moz-placeholder': {
      padding: '50px 30px 0px 20px',
      fontSize: '19px',
      color: '#717171',
    },
    ':-moz-placeholder': {
      padding: '50px 30px 0px 20px',
      fontSize: '19px',
      color: '#717171',
    },
    ':-ms-input-placeholder': {
      padding: '50px 30px 0px 20px',
      fontSize: '19px',
      color: '#717171',
    },
    '::placeholder': {
      padding: '50px 30px 0px 20px',
      fontSize: '19px',
      color: '#717171',
    },
  },
});
