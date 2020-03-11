import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  column: {
    ':first-child': {
      marginLeft: '0px',
    },
    '@media (min-width: 768px)': {
      width: '16.6667%',
      float: 'left',
      marginLeft: '8.3333%',
    },
  },
});
