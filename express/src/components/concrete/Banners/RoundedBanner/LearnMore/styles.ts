import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    fontSize: '18px',
    lineHeight: '20px',
    letterSpacing: 'normal',
    '@media (min-width: 1128px)': {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  smallScreenWrapper: {
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: 'normal',
  },
  container: {
    color: '#ffffff',
  },
  icon: {
    fontSize: '10px',
    '@media (min-width: 1128px)': {
      fontSize: '12px',
    },
  },
  chevron: {
    fill: 'currentColor',
    height: '1em',
    width: '1em',
  },
});
