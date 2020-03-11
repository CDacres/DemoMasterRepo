import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  textBlock: {
    width: '85%',
    display: 'inline-block',
    '@media (max-width: 1025px)': {
      width: '100%',
    },
  },
});
