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
  carouselOptionContainerInner: {
    width: '100%',
    height: '100%',
  },
  optionImageWithTextContainer: {
    position: 'relative',
    width: '100%',
    zIndex: 0,
    paddingTop: '62.5%',
    background: 'transparent',
    contain: 'strict',
  },
  cardImageAbsolute: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    height: '100%',
    width: '100%',
  },
  cardImageContainer: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    position: 'absolute',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    animationName: opacityKeyframes,
    animationDuration: '300ms',
    animationTimingFunction: 'ease-out',
    backgroundSize: 'cover',
  },
  cardImageFull: {
    height: '100%',
    width: '100%',
  },
  carouselWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
    whiteSpace: 'normal',
    width: '100%',
  },
  positionRelative_zIndex0: {
    position: 'relative',
    zIndex: 0,
  },
  shadedText: {
    textDecoration: 'none',
    color: '#484848',
    display: 'block',
    ':hover': {
      textDecoration: 'none',
    },
  },
  textWrapper: {
    width: '85%',
  },
  optionTextWrapper: {
    whiteSpace: 'normal',
  },
  hiddenCarousel: {
    visibility: 'hidden',
    transition: 'visibility 0s linear 0.5s',
  },
});
