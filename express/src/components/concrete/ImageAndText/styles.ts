import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  innerPad: {
    '@media (min-width: 768px)': {
      paddingTop: '430px',
    },
    '@media (min-width: 1128px)': {
      paddingTop: '630px',
    },
  },
  leftAbsolute: {
    width: '100%',
    paddingTop: '5px',
    paddingBottom: '5px',
    '@media (min-width: 768px)': {
      position: 'absolute',
      zIndex: 1,
      top: 'calc(50% - 20px)',
      left: '0px',
      transform: 'translateY(-50%)',
      width: '350px',
    },
    '@media (min-width: 1128px)': {
      top: '50%',
      transform: 'translateY(-50%)',
      width: '500px',
    },
  },
  rightAbsolute: {
    paddingBottom: '38px',
    bottom: '0px',
    left: '0px',
    '@media (min-width: 768px)': {
      position: 'absolute',
      zIndex: 2,
      top: 'calc(50% - 20px)',
      transform: 'translateY(-50%)',
      paddingTop: '5px',
      paddingBottom: '5px',
      left: '400px',
      right: '0px',
    },
    '@media (min-width: 1128px)': {
      top: '50%',
      transform: 'translateY(-50%)',
      paddingTop: '5px',
      paddingBottom: '5px',
      left: '600px',
      right: '0px',
    },
  },
});
