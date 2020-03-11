import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    contain: 'strict',
    position: 'relative',
    width: '100%',
    zIndex: 0,
    paddingTop: '100%',
    background: 'transparent',
  },
  inner: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    height: '100%',
    width: '100%',
  },
});
