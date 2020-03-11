import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  logoWrapper: {
    position: 'relative',
    zIndex: 20,
  },
  content: {
    height: '64px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    transition: '0.25s color',
    whiteSpace: 'nowrap',
    '@media (min-width: 744px)': {
      height: '80px',
    },
  },
  contentIconInner: {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: '34px',
    transition: 'color 0.25s ease 0s',
  },
});
