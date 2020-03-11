import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  button: {
    appearance: 'none',
    border: '0px none',
    borderRadius: '0px',
    padding: '0px',
    userSelect: 'auto',
    textAlign: 'left',
    minWidth: '1px',
    fontSize: '14px',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  normal: {
    color: '#00c6ff',
  },
});
