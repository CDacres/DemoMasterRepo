import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  menuWrapper: {
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: '0px',
    zIndex: 2,
    background: '#ffffff',
  },
  container: {
    position: 'relative',
    width: '100vw',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    left: '50%',
    right: '50%',
  },
  contentWrapper: {
    width: '100%',
    margin: '0px auto',
    maxWidth: '1300px',
    '@media (max-width: 743px)': {
      overflowX: 'hidden',
    },
  },
  contentInner: {
    '@media (max-width: 743px)': {
      padding: '8px 0px',
    },
  },
});
