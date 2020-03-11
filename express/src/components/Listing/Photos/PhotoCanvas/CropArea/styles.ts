import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  cropperArea: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 0px 9999em',
    color: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  roundShape: {
    borderRadius: '50%',
  },
  gridLines: {
    ':before': {
      border: '1px solid rgba(255, 255, 255, 0.5)',
      content: '" "',
      position: 'absolute',
      boxSizing: 'border-box',
      top: '0px',
      bottom: '0px',
      left: '33.33%',
      right: '33.33%',
      borderTop: '0px',
      borderBottom: '0px',
    },
    ':after': {
      border: '1px solid rgba(255, 255, 255, 0.5)',
      content: '" "',
      position: 'absolute',
      boxSizing: 'border-box',
      top: '33.33%',
      bottom: '33.33%',
      left: '0px',
      right: '0px',
      borderLeft: '0px',
      borderRight: '0px',
    },
  },
});
