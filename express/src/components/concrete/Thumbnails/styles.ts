import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  pictureContainer: {
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'repeat(5, 1fr)',
    '@media (max-width: 767px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  pictureButton: {
    border: '0px none',
    display: 'block',
    background: 'transparent none repeat scroll 0% 0%',
    position: 'relative',
    width: '100%',
    padding: '100% 0px 0px',
    overflow: 'hidden',
    minWidth: '1px',
  },
  pictureButtonInner: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  pictureInner: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  picture: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
});
