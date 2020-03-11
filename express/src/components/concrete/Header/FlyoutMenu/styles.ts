import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  flyoutMenuContainer: {
    backgroundColor: '#ffffff',
    bottom: '0px',
    height: '100%',
    left: '0px',
    position: 'fixed',
    right: '0px',
    top: '0px',
    zIndex: 10,
    transitionDuration: '0.2s',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out',
    transform: 'translateY(0px)',
  },
  flyoutMenuMask: {
    height: '64px',
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '0px',
    left: '0px',
    willChange: 'transform',
    zIndex: 15,
  },
});
