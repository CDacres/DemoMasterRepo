import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  titleWrapper: {
    top: '182px',
    position: 'sticky',
    backgroundColor: '#ffffff',
    zIndex: 1,
    '@media (max-width: 743px)': {
      top: '64px',
    },
  },
  titleInner: {
    fontSize: '16px',
  },
});
