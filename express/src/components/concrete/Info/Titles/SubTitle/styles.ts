import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrapper: {
    '@media (min-width: 744px)': {
      maxWidth: '680px',
      margin: '0px auto',
    },
  },
  title: {
    fontSize: '24px',
    lineHeight: '30px',
    letterSpacing: 'normal',
    color: '#484848',
    fontWeight: 'normal',
  },
});
