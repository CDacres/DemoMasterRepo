import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  mainContentWrapper: {
    position: 'relative',
    width: '100%',
    zIndex: 0,
  },
  showMap: {
    '@media (min-width: 1128px)': {
      width: '66%',
    },
  },
  searchContent: {
    overflowAnchor: 'none',
    minHeight: '400px',
  },
});
