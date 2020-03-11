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
  searchIconTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    border: '0px none',
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    position: 'relative',
  },
  icon: {
    postion: 'absolute',
    animationName: opacityKeyframes,
    animationDuration: '300ms',
    animationTimingFunction: 'ease-out',
  },
  searchIconTextContainer: {
    flexShrink: 100,
  },
  searchTextWrapper: {
    fontSize: '14px',
    lineHeight: '19px',
    '@media (min-width: 744px)': {
      lineHeight: '24px',
    },
  },
});
