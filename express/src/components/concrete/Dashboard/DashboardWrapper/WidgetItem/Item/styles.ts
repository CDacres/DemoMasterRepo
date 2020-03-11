import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    display: 'table',
    width: '100%',
    '@media (max-width: 743px)': {
      display: 'block',
    },
  },
  textWrapper: {
    width: '30%',
    '@media (max-width: 743px)': {
      width: '100%',
      display: 'block',
      marginBottom: '16px',
    },
  },
});
