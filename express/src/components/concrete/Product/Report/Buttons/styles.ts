import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  backButton: {
    minWidth: '1px',
    border: '0px none',
    color: '#00c6ff',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
