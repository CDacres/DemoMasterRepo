import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  tableWrapper: {
    width: '100%',
    position: 'relative',
    minHeight: '438px',
  },
  tableContainer: {
    width: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    overflowX: 'auto',
    '@media (min-width: 744px)': {
      position: 'static',
      overflowX: 'visible',
    },
  },
  smallScreenContainer: {
    position: 'relative',
    display: 'inline-block',
    left: '0px',
    zIndex: 1,
    backgroundColor: '#ffffff',
    boxShadow: '8px 0px 8px -4px rgba(219, 219, 219, 0.4), inset -16px 0px 8px -4px #ffffff',
    maxWidth: '176px',
  },
  table: {
    width: 'auto',
    '@media (min-width: 744px)': {
      width: '100%',
    },
  },
});
