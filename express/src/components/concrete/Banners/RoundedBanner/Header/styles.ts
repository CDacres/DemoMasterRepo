import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    fontSize: '24px',
    lineHeight: '30px',
    letterSpacing: 'normal',
    fontWeight: 800,
    '@media (min-width: 1128px)': {
      fontSize: '34px',
      lineHeight: '38px',
    },
    '@media (min-width: 1440px)': {
      fontSize: '38px',
      lineHeight: '42px',
    },
  },
  smallScreenWrapper: {
    fontSize: '22px',
    lineHeight: '26px',
    letterSpacing: 'normal',
  },
  container: {
    color: '#ffffff',
  },
});
