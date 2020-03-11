import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  contentWrapper: {
    minWidth: '0px',
    width: '100%',
  },
  horizontalWrapper: {
    marginLeft: '16px',
    '@media (max-width: 743px)': {
      marginLeft: '0px',
    },
  },
});
