import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  firstTitleContainer: {
    height: '18px',
    '@media (min-width: 744px)': {
      height: 'auto',
    },
  },
  secondTitleContainer: {
    display: 'table',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
});
