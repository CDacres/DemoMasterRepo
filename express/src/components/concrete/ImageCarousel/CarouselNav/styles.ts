import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  carouselNavOuter: {
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    right: '0px',
    padding: '8px 0px',
    background: 'rgba(0, 0, 0, 0) linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%) repeat scroll 0% 0%',
  },
  carouselNavInner: {
    lineHeight: '0px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  carouselNavDot: {
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    transformOrigin: '50% 50% 0px',
    ':after': {
      content: '""',
      width: '6px',
      height: '6px',
      borderRadius: '3px',
      display: 'inline-block',
      backfaceVisibility: 'hidden',
      border: 'medium none',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
  },
  carouselNavDotActive: {
    ':after': {
      content: '""',
      display: 'inline-block',
      backfaceVisibility: 'hidden',
      border: 'medium none',
      width: '8px',
      height: '8px',
      borderRadius: '4px',
      backgroundColor: '#ffffff',
    },
  },
});
