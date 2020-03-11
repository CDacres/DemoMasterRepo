import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  headerWrapper: {
    position: 'relative',
    flexDirection: 'column',
    flex: '0 0 auto',
    width: 'calc(33.3333% - 5.33333px)',
    paddingRight: '24px',
    '@media (max-width: 743px)': {
      width: '100%',
      marginBottom: '40px',
      paddingRight: '0px',
    },
  },
  flexHeader: {
    display: 'flex',
  },
  stickyContent: {
    position: 'sticky',
    top: '80px',
  },
  ratingTitleWrapper: {
    maxWidth: '100%',
  },
});
