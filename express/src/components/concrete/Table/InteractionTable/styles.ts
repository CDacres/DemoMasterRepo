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
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
  },
  blankWrapper: {
    content: '" "',
    display: 'block',
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: -1,
    animation: opacityKeyframes,
    animationDuration: '1ms',
    visibility: 'hidden',
    opacity: 0,
  },
  blankItem: {
    content: '" "',
    display: 'block',
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%',
    overflow: 'auto',
    zIndex: -1,
    background: '#eee',
  },
  blank: {
    background: '#eee',
    overflow: 'auto',
    ':before': {
      width: '200%',
      height: '200%',
      content: '" "',
      display: 'block',
      position: 'absolute',
      top: '0px',
      left: '0px',
      overflow: 'hidden',
      zIndex: -1,
    },
  },
  shadow: {
    position: 'absolute',
    width: '8px',
    top: '8px',
    bottom: '8px',
    zIndex: 1,
    pointerEvents: 'none',
    display: 'none',
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.4)',
  },
  rightSide: {
    right: '-8px',
  },
  leftSide: {
    left: '-8px',
  },
  table: {
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    width: '100%',
    maxWidth: 'initial',
  },
});
