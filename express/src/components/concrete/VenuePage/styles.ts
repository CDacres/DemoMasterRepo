import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  space: {
    height: '64px',
    width: '100%',
    background: '#000000 none repeat scroll 0% 0%',
    '@media (min-width: 744px)': {
      height: '80px',
    },
  },
  pageInner: {
    width: '100%',
    margin: '0px auto',
    maxWidth: '1300px',
    '@media (max-width: 743px)': {
      overflowX: 'hidden',
    },
  },
  footer: {
    borderBottomWidth: '64px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
  },
});
