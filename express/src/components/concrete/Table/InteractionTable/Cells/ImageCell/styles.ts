import { StyleSheet } from 'aphrodite/no-important';

const opacityKeyframes = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

export default StyleSheet.create({
  wrapper: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  imgContainer: {
    width: '71px',
    height: '71px',
    background: '#00c6ff',
    position: 'relative',
    '@media (min-width: 744px)': {
      height: '47px',
    },
  },
  imgContent: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    animationName: opacityKeyframes,
    animationDuration: '300ms',
    animationTimingFunction: 'ease-out',
    backgroundSize: 'cover',
  },
  iconWrapper: {
    color: '#ffffff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});
