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
  saveIconsWrapper: {
    position: 'absolute',
    top: '44px',
    right: '24px',
    zIndex: 1,
  },
  saveIconsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  fullScreenInner: {
    display: 'flex',
  },
  imgWrapper: {
    flex: 2,
  },
  smallImageWrapper: {
    flex: 1,
  },
  topImgWrapper: {
    overflow: 'hidden',
    height: 'calc(50% - 8px)',
  },
  mobileContainer: {
    paddingTop: '113.3333%',
    contain: 'strict',
    width: '100%',
    position: 'relative',
  },
  mobileInner: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    right: '0px',
    left: '0px',
  },
  mobileOut: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '-1px',
    right: '-1px',
    visibility: 'visible',
  },
  mobileIn: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  mobileContent: {
    left: '-200%',
    height: '100%',
    display: 'flex',
    width: '100%',
    position: 'relative',
  },
  animationWrapper: {
    animationName: opacityKeyframes,
    animationDuration: '1.6s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
  },
  animationInner: {
    height: '100%',
  },
  break: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    left: '0px',
    height: '50px',
    background: 'linear-gradient(rgba(0, 0, 0, 0.25), transparent)',
  },
  buttonsWrapper: {
    height: '100%',
    opacity: 1,
    transition: 'opacity 250ms ease 0s',
  },
  buttonsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'transparent',
  },
  buttonWrapper: {
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: '25%',
    pointerEvents: 'auto',
    borderWidth: '0px',
    borderStyle: 'initial',
    borderColor: 'initial',
    borderImage: 'initial',
  },
  buttonLeft: {
    left: '0px',
    background: 'linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.25) 100%)',
  },
  buttonRight: {
    right: '0px',
    background: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.25) 100%)',
  },
  innerWrapper: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  leftInner: {
    left: '16px',
  },
  rightInner: {
    right: '16px',
  },
  bottomElement: {
    left: '0px',
    position: 'absolute',
    right: '0px',
    alignItems: 'flex-end',
    bottom: '0px',
    display: 'flex',
  },
  bottomElementWrapper: {
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },
  bottomBreak: {
    background: 'rgba(0, 0, 0, 0) linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent) repeat scroll 0% 0%',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    position: 'absolute',
    zIndex: -1,
  },
  lineWrapper: {
    marginTop: '20px',
  },
  lineContainer: {
    marginLeft: '-2px',
    marginRight: '-2px',
  },
  lineInner: {
    display: 'table',
    width: '100%',
  },
});
