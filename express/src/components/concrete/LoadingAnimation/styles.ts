import { StyleSheet } from 'aphrodite/no-important';

const keyframesAnimateDots = {
  '0%, 80%, 100%': {
    opacity: 0.1,
  },
  '30%, 50%': {
    opacity: 0.3,
  },
};

const keyframesAnimateWhiteDots = {
  '0%, 80%, 100%': {
    opacity: 0.5,
  },
  '30%, 50%': {
    opacity: 1,
  },
};

export default StyleSheet.create({
  dotsWrapperButton: {
    height: '22px',
  },
  dotsWrapperLarge: {
    height: '500px',
  },
  dotsWrapperSmall: {
    height: '50px',
  },
  dotsContainer: {
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',
    MsTransform: 'translateX(-50%) translateY(-50%)',
    transform: 'translateX(-50%) translateY(-50%)',
    lineHeight: 'normal',
  },
  dots: {
    borderRadius: '100%',
    display: 'inline-block',
    WebkitAnimationName: keyframesAnimateDots,
    animationName: keyframesAnimateDots,
    WebkitAnimationDuration: '0.8s',
    animationDuration: '0.8s',
    WebkitAnimationIterationCount: 'infinite',
    animationIterationCount: 'infinite',
    WebkitAnimationTimingFunction: 'linear',
    animationTimingFunction: 'linear',
    WebkitAnimationFillMode: 'both',
    animationFillMode: 'both',
    verticalAlign: 'middle',
    width: '12px',
    height: '12px',
    backgroundColor: '#00c6ff',
  },
  dotsWhite: {
    WebkitAnimationName: keyframesAnimateWhiteDots,
    animationName: keyframesAnimateWhiteDots,
    backgroundColor: '#ffffff',
  },
  dotsSmall: {
    width: '8px',
    height: '8px',
  },
  firstDot: {
    WebkitAnimationDelay: '-0.3s',
    animationDelay: '-0.3s',
  },
  secondDot: {
    WebkitAnimationDelay: '-0.15s',
    animationDelay: '-0.15s',
  },
});
