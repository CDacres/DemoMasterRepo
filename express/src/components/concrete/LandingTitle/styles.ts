import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  landingTitleWrapper: {
    marginTop: '40px',
    '@media (max-width: 767px)': {
      marginTop: '0px',
    },
  },
  landingTitleContainer: {
    width: '80%',
    marginTop: '64px',
    '@media (max-width: 767px)': {
      marginTop: '0px',
    },
  },
  landingTitle_h1: {
    fontSize: '48px',
    lineHeight: '56px',
    letterSpacing: '-0.8px',
    fontWeight: 300,
    '@media (max-width: 767px)': {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.6px',
    },
  },
  landingTitle_h1Span: {
    fontSize: '48px',
    fontWeight: 900,
    color: '#00c6ff',
  },
  landingTitle_h2: {
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '0.2px',
    fontWeight: 300,
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },
});
