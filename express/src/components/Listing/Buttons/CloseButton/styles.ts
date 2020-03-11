import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  remove: {
    opacity: 0.5,
    transition: 'opacity 300ms',
    ':hover': {
      opacity: 1,
    },
  },
});
