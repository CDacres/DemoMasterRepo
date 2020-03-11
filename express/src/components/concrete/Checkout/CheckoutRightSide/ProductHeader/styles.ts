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
  container: {
    display: 'table',
    width: '100%',
    borderSpacing: '0px',
  },
  subtitleSmall: {
    fontSize: '10px',
  },
  imgContainerLarge: {
    width: '100px',
    height: '80px',
  },
  imgContainerSmall: {
    width: '80px',
    height: '60px',
  },
  image: {
    position: 'absolute',
    animationName: opacityKeyframes,
    animationDuration: '300ms',
    animationTimingFunction: 'ease-out',
  },
});
