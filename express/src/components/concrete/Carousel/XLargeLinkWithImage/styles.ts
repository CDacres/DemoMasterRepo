import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  largeOptionContainer: {
    '@media (min-width: 744px)': {
      width: '50%',
    },
    '@media (min-width: 1128px)': {
      width: '33.3333%',
    },
  },
  borderedContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '3px',
    overflow: 'hidden',
  },
});
