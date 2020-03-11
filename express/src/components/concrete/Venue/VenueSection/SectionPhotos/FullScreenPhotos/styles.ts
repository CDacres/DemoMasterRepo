import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    background: '#ffffff none repeat scroll 0% 0%',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    zIndex: 2000,
    position: 'fixed',
    height: '100%',
    width: '100%',
  },
  topBarContainer: {
    height: '64px',
    width: '100%',
    borderBottom: '1px solid #e4e4e4',
    position: 'relative',
    zIndex: 0,
  },
  topBarLeft: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '24px',
    zIndex: 1,
  },
  topBarWrapper: {
    display: 'table',
    position: 'relative',
    height: '100%',
  },
  closeButton: {
    position: 'sticky',
    top: '0px',
    alignSelf: 'flex-start',
    border: '0px none',
    boxShadow: 'none',
    zIndex: 3,
  },
  contentWrapper: {
    width: '100%',
    height: 'calc(100% -56px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  contentContainer: {
    margin: '48px 0px 48px 0px',
    '@media (max-width: 743px)': {
      margin: '24px 0px 24px 0px',
    },
  },
  contentInner: {
    width: '100%',
    maxWidth: '1440px',
    padding: '0px 16px',
    margin: '0px auto',
    '@media (max-width: 743px)': {
      overflowX: 'hidden',
    },
  },
  contentIn: {
    display: 'flex',
    alignItems: 'stretch',
  },
  infoWrapper: {
    minHeight: '48px',
    position: 'relative',
  },
  infoContainer: {
    display: 'table',
    position: 'relative',
    height: '100%',
  },
  imgContainer: {
    height: '48px',
    width: '48px',
    display: 'inline-block',
  },
  imgInner: {
    appearance: 'none',
    background: 'transparent',
    border: '0px none',
    cursor: 'pointer',
    margin: '0px',
    padding: '0px',
    userSelect: 'auto',
    textDecoration: 'none',
  },
  imgContent: {
    height: '48px',
    width: '48px',
    backgroundColor: '#d8d8d8',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#ffffff',
    verticalAlign: 'middle',
    overflow: 'hidden',
    display: 'block',
  },
  headerWrapper: {
    width: '33.3333%',
    '@media (max-width 743px)': {
      display: 'none',
    },
    '@media (max-width 1127px)': {
      display: 'none',
    },
  },
  headerContainer: {
    width: '80%',
    position: 'sticky',
    top: '48px',
    left: '0px',
    margin: '0px auto',
  },
  headerContent: {
    overflowWrap: 'break-word',
    fontSize: '32px',
    fontWeight: 800,
    lineHeight: '1.125',
  },
});
