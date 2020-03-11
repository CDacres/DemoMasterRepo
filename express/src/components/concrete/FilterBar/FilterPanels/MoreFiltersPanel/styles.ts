import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  panel: {
    position: 'fixed',
    bottom: '0px',
    width: '66%',
    height: 'initial',
    border: 'medium none',
    boxShadow: 'none',
    top: '132px',
  },
  panelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  panelContainer: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});
