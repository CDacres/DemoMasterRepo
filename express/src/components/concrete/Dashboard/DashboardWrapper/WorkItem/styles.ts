import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  button: {
    '@media (max-width: 743px)': {
      width: '100%',
    },
    ':disabled': {
      borderColor: 'transparent',
    },
  },
});
