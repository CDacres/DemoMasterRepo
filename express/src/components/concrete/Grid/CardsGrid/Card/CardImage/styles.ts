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
  cardImage: {
    width: '100%',
    position: 'relative',
    zIndex: 0,
  },
  cardImagePadder: {
    position: 'relative',
    width: '100%',
    zIndex: 0,
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
    overflow: 'hidden',
    paddingTop: '66.6667%',
    background: '#d8d8d8',
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
  mysteryDiv: {
    pointerEvents: 'none',
    top: '0px',
    zIndex: 1,
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
  mysteryDivInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: 'transparent',
    pointerEvents: 'none',
  },
  clippedText: {
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
  imageWrapper: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  imageWrapperTransformed: {
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
  },
  imageContainer: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '100%',
    width: '100%',
  },
  cardImageContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    animationName: opacityKeyframes,
    animationDuration: '300ms',
    animationTimingFunction: 'ease-out',
    borderRadius: '3px',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
  },
});
