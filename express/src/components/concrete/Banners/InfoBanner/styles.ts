import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  content: {
    height: '375px',
    maxWidth: '1280px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 'auto',
    position: 'relative',
    '@media (min-width: 744px)': {
      height: '440px',
    },
  },
  background: {
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  },
  whiteTitle: {
    color: '#ffffff',
  },
});
