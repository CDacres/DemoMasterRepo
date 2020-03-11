import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  small: {
    display: 'none',
    '@media (max-width: 744px)': {
      display: 'contents',
    },
  },
  smallMedium: {
    display: 'none',
    '@media (max-width: 1128px)': {
      display: 'contents',
    },
  },
  medium: {
    display: 'none',
    '@media (min-width: 745px) and (max-width: 1128px)': {
      display: 'contents',
    },
  },
  mediumLarge: {
    display: 'none',
    '@media (min-width: 745px)': {
      display: 'contents',
    },
  },
  large: {
    display: 'none',
    '@media (min-width: 1129px)': {
      display: 'contents',
    },
  },
});
