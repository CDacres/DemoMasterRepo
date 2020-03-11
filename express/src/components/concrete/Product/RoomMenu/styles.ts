import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  setMenuWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    '@media (max-width: 767px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  overflowWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  setMenu: {
    position: 'relative',
    height: '7em',
    overflow: 'hidden',
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '0px',
      width: '100%',
      height: '2.2em',
      background: 'rgba(0, 0, 0, 0) linear-gradient(rgba(255, 255, 255, 0), #ffffff 90%) repeat scroll 0% 0%',
    },
  },
});
