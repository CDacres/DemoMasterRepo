import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  buttonWrapper: {
    display: 'inline-block',
  },
  iconButton: {
    borderColor: 'transparent',
    background: '#ffffff',
    height: '40px',
    width: '40px',
    boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.14)',
    padding: '0px 8px',
    minWidth: '40px',
    ':-moz-focus-inner': {
      border: '0px none',
      padding: '0px',
      margin: '0px',
    },
    ':focus::-moz-focus-inner': {
      border: '1px dotted #000000',
    },
    ':active': {
      borderColor: '#e2e2e2',
    },
    ':hover': {
      background: '#ffffff',
    },
    ':disabled': {
      background: 'rgba(255, 255, 255, 0.3)',
      cursor: 'default',
    },
  },
  iconBox: {
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    '-webkit-transform': 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    color: '#484848',
  },
  icons: {
    height: '17px',
    width: '17px',
    display: 'block',
    transition: 'stroke 0.15s linear',
    ':hover': {
      stroke: 'rgba(0, 185, 255, 0.6)',
    },
  },
});
