import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  mapOverlay: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    zIndex: 1,
  },
  mapWrapper: {
    position: 'absolute',
    display: 'block',
    right: '0px',
    height: 'calc(-128px + 100vh)',
    width: '34%',
  },
  mapInnerWrapper: {
    top: '0px',
    height: 'calc(100vh - 64px)',
    width: '100%',
    '@media (min-width: 1128px)': {
      height: 'calc(100vh - 128px)',
      width: '100%',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      height: 'calc(100vh - 80px)',
    },
  },
  mapInnerContainer: {
    height: '100%',
    position: 'relative',
  },
});
