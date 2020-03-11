import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  carouselOverflowWrapper: {
    marginLeft: '-24px',
    marginRight: '-24px',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  scrollOverflowWrapper: {
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
  },
  scrollOverflowContainer: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    paddingBottom: '30px',
    marginBottom: '-30px',
  },
  scrollOverflowInner: {
    display: 'flex',
  },
});
