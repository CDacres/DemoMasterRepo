import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  blankWrapper: {
    content: '" "',
    display: 'block',
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%',
    zIndex: -1,
  },
  blankHidden: {
    overflow: 'hidden',
  },
  blankContainer: {
    background: '#eee',
    overflow: 'auto',
  },
  blankInner: {
    width: '886px',
    height: '80px',
  },
  blank: {
    background: '#eee',
    overflow: 'auto',
    ':before': {
      width: '200%',
      height: '200%',
    },
  },
});
