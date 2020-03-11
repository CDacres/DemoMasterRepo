import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  lineContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
    height: '2px',
  },
  animation: {
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.4) 50%, white 50%)',
    backgroundSize: '200% 100%',
    backgroundPosition: 'right bottom',
    transition: 'all 8s ease-out',
    position: 'relative',
    height: '2px',
  },
});
