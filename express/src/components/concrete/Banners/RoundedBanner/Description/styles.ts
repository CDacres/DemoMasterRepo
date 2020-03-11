import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: 'normal',
    color: '#484848',
    '@media (min-width: 1128px)': {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  smallScreenWrapper: {
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: 'normal',
    color: '#484848',
  },
  container: {
    color: '#ffffff',
  },
});
