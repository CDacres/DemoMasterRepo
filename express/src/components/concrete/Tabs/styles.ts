import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  navWrapper: {
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
  },
  navContainer: {
    height: '100%',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    paddingBottom: '30px',
    marginBottom: '-30px',
  },
  navInner: {
    borderBottom: '1px solid #ebebeb',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
    minWidth: '100%',
  },
  iconButton: {
    background: 'transparent none repeat scroll 0% 0%',
    border: '0px none',
    height: '100%',
    padding: '0px',
    position: 'absolute',
    top: '0px',
    opacity: 0,
    zIndex: -1,
    transitionProperty: 'opacity, z-index',
    transitionDuration: '300ms, 0ms',
    transitionTimingFunction: 'ease-out',
    transitionDelay: '0ms, 300ms',
    minWidth: '1px',
    borderRadius: '0px',
    fontSize: '14px',
    lineHeight: 'inherit',
    '::-moz-focus-inner': {
      border: '0px none',
      padding: '0px',
      margin: '0px',
    },
    ':focus': {
      '::-moz-focus-inner': {
        border: '1px dotted #000000',
      },
    },
  },
  previousButton: {
    left: '0px',
  },
  nextButton: {
    right: '0px',
  },
  buttonInner: {
    backgroundColor: '#ffffff',
    display: 'inline-block',
    height: '100%',
    position: 'relative',
    verticalAlign: 'top',
  },
  buttonIcon: {
    color: '#484848',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  spacer: {
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'top',
    width: '20px',
  },
  previousSpacer: {
    background: 'linear-gradient(to left, rgba(255, 255, 255, 0), #ffffff)',
  },
  nextSpacer: {
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0), #ffffff)',
  },
});
