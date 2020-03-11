import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    backgroundColor: '#ffffff',
    zIndex: 2000,
  },
  contentWrapper: {
    width: '100%',
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  contentContainer: {
    margin: '48px 0px 40px 0px',
    '@media (max-width: 743px)': {
      margin: '24px 0px',
    },
  },
  contentInner: {
    width: '100%',
    maxWidth: '1440px',
    margin: '0px auto',
    '@media (max-width: 743px)': {
      overflowX: 'hidden',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 743px)': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  },
  leftWrapper: {
    flex: '6 1 0px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-16px',
    '@media (max-width: 1127px)': {
      flex: 1,
    },
  },
  leftContainer: {
    position: 'sticky',
    top: '32px',
  },
  largeContact: {
    maxWidth: '441px',
    marginLeft: '20px',
  },
  space: {
    display: 'none',
    '@media (min-width: 1128px)': {
      flex: 2,
      display: 'block',
    },
  },
  rightWrapper: {
    flex: '4 1 0%',
    '@media (max-width: 1127px)': {
      flex: 1,
    },
    '@media (max-width: 743px)': {
      minHeight: '416px',
      width: '100%',
    },
  },
});
