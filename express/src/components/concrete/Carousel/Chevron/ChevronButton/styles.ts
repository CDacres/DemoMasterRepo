import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  chevronContainer: {
    top: '50%',
    position: 'absolute',
    display: 'block',
    WebkitTransform: 'translateY(-50%)',
    MsTransform: 'translateY(-50%)',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  chevronButtonSpan: {
    position: 'relative',
    bottom: 'auto',
  },
  chevronLarge: {
    top: '-45px',
  },
  chevronSmall: {
    top: '-2px',
  },
  adjustedTop: {
    top: '50%',
  },
  chevronButton: {
    borderRadius: '50%',
    lineHeight: 1,
    border: '2px solid transparent',
    width: '32px',
    minWidth: '32px',
    height: '32px',
    padding: '0px',
    background: '#ffffff',
    boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.14)',
    '::-moz-focus-inner': {
      border: '0px none',
      padding: '0px',
      margin: '0px',
    },
    ':focus::-moz-focus-inner': {
      border: '1px dotted #000000',
    },
    ':focus': {
      outline: 'none',
      boxShadow: '0px 0px 2px 2px #00c6ff',
    },
    ':active': {
      borderColor: '#ececec',
    },
    ':hover': {
      background: '#ffffff',
    },
    ':disabled': {
      background: 'rgba(255, 255, 255, 0.3)',
      cursor: 'default',
    },
  },
  chevronEnc: {
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    WebkitTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    fontSize: '16px',
  },
});
