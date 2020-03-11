import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  imgWrapper: {
    position: 'relative',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  },
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    position: 'static',
  },
  imgDiv: {
    backgroundSize: 'cover',
    display: 'none',
    backgroundImage: 'none',
    verticalAlign: 'bottom',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  },
});
