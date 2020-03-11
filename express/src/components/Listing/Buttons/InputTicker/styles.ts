import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  button: {
    width: '36px',
    opacity: 0.5,
    transition: 'opacity 300ms',
    ':hover': {
      opacity: 1,
    },
  },
});
