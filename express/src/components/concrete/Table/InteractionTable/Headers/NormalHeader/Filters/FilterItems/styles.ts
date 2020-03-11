import { StyleSheet } from 'aphrodite/no-important';

const opacityKeyframes = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 0,
  },
};

export default StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    left: '-1px',
    marginTop: '5px',
    position: 'absolute',
    right: '-1px',
    display: 'block',
    overflow: 'hidden',
    width: 'auto',
  },
  contentWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  filtersWrapper: {
    maxWidth: '100%',
    minHeight: '200px',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    height: 'calc(100vh - 320px)',
  },
  spaceWrapper: {
    animation: opacityKeyframes,
    animationDuration: '1ms',
    visibility: 'hidden',
    opacity: 0,
  },
  spaceContainer: {
    overflow: 'auto',
    background: '#eee',
  },
  spaceContainerBefore: {
    ':before': {
      width: '200%',
      height: '200%',
    },
  },
  shadow: {
    position: 'absolute',
    height: '8px',
    left: '8px',
    right: '8px',
    zIndex: 1,
    pointerEvents: 'none',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
    bottom: '-8px',
  },
});
