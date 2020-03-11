import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  title: {
    fontSize: '40px',
    lineHeight: '40px',
    letterSpacing: 'normal',
    fontWeight: 'normal',
    '@media (min-width: 1128px)': {
      fontSize: '60px',
      lineHeight: '64px',
    },
  },
  setLetterSpacing: {
    letterSpacing: '-1.5px',
    '@media (min-width: 1128px)': {
      letterSpacing: '-2.5px',
    },
  },
  setWidth: {
    maxWidth: '330px',
    '@media (min-width: 1128px)': {
      maxWidth: '430px',
    },
    '@media (max-width: 743px)': {
      fontSize: '38px',
      lineHeight: '44px',
      letterSpacing: 'normal',
    },
  },
});
