import { StyleSheet } from 'aphrodite/no-important';
import { specs } from '@src/core/ux';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
    padding: '6px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  innerContainers: {
    position: 'absolute',
  },
  topContainers: {
    top: '8px',
  },
  bottomContainers: {
    bottom: '8px',
  },
  rightContainers: {
    right: '8px',
  },
  leftContainers: {
    left: '8px',
  },
  order: {
    display: 'grid',
    backgroundColor: '#fff',
    color: specs.textColor,
  },
  coverContainer: {
    borderRadius: specs.borderRadius,
  },
  indexContainer: {
    borderRadius: '8.5px',
    minWidth: '17px',
    justifyContent: 'center',
  },
  eventContainers: {
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    borderRadius: specs.borderRadius,
    verticalAlign: 'bottom',
  },
  confirm: {
    color: '#fff',
    backgroundColor: 'rgba(244, 67, 54, 0.58)',
  },
  coverText: {
    fontSize: '9px',
    lineHeight: '9px',
    textTransform: 'uppercase',
  },
});
