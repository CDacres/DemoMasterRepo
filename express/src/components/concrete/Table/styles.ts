import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  space: {
    position: 'fixed',
    left: '0px',
    right: '0px',
    bottom: '0px',
    zIndex: 99,
  },
  headerWrapper: {
    position: 'relative',
    marginLeft: '-24px',
    marginRight: '-24px',
    zIndex: 4,
  },
  stickyContainer: {
    height: '79px',
  },
  stickyFullScreen: {
    position: 'fixed',
    transform: 'translate3d(0px, 0px, 0px)',
    top: '0px',
    width: '100%',
  },
  stickyInner: {
    position: 'fixed',
    transform: 'translate3d(0px, 0px, 0px)',
    top: '0px',
    width: 'auto',
  },
});
