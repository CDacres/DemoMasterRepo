import { StyleSheet } from 'aphrodite/no-important';

const opacityKeyframes = {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
};

export default StyleSheet.create({
  carouselImageHiddenTitle: {
    position: 'absolute',
    display: 'block',
    border: '0px none',
    margin: '-1px',
    padding: '0px',
    height: '1px',
    width: '1px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    overflow: 'hidden',
  },
  carouselImageWrapper: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  carouselImageContainerOuter: {
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
  },
  carouselImageContainerInner: {
    display: 'inline-block',
    height: '100%',
    width: '100%',
    verticalAlign: 'middle',
  },
  carouselImageContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  carouselImage: {
    position: 'absolute',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    animationName: opacityKeyframes,
    animationDuration: '300ms',
    animationTimingFunction: 'ease-out',
    borderRadius: '3px',
    backgroundSize: 'contain',
    height: '100%',
    width: '100%',
  },
});
