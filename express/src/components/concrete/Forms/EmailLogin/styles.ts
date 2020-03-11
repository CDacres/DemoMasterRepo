import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  imgContainer: {
    height: '120px',
    width: '120px',
    display: 'block',
    position: 'relative',
    margin: '0px auto',
  },
  avatar: {
    fontSize: '35px',
  },
  formInner: {
    '@media (min-width: 744px)': {
      width: '66.6667%',
      marginLeft: '16.6667%',
    },
  },
});
