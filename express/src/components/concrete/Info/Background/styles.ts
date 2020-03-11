import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  background: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: '#f8f8f8',
    width: '100%',
    height: '580px',
    zIndex: -1,
    '@media (min-width: 744px)': {
      height: '640px',
    },
    '@media (min-width: 1128px)': {
      height: '700px',
    },
  },
});
