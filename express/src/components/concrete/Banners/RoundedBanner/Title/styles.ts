import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: 'normal',
    textTransform: 'uppercase',
    '@media (min-width: 415px)': {
      fontSize: '12px',
      lineHeight: '16px',
    },
    '@media (min-width: 1128px)': {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
  smallScreenWrapper: {
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: 'normal',
    textTransform: 'uppercase',
  },
  container: {
    color: '#ffffff',
  },
});
