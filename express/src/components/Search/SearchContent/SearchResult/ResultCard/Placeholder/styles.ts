import { StyleSheet } from 'aphrodite/no-important';

const opacityKeyframes = {
  '0%': {
    opacity: 0.1,
  },
  '100%': {
    opacity: 0.3,
  },
};

export default StyleSheet.create({
  shimmer: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
  shimmerAnimation: {
    animationDirection: 'alternate',
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: opacityKeyframes,
    animationTimingFunction: 'ease-in-out',
    backgroundColor: 'currentColor',
    display: 'inline-block',
    position: 'relative',
  },
  shimmerSpan: {
    height: '100%',
    width: '100%',
  },
  resultCardChild: {
    position: 'relative',
    paddingTop: '66.6667%',
  },
});
