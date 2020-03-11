import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  imgContainer: {
    paddingTop: '133.333%',
    position: 'relative',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  },
  imgInner: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContent: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    position: 'static',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
  },
  backgroundImageWrapper: {
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
