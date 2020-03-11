import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  bigSpace: {
    width: '100%',
    height: '48px',
    '@media (min-width: 744px)': {
      height: '72px',
    },
    '@media (min-width: 1128px)': {
      height: '96px',
    },
  },
  smallSpace: {
    width: '100%',
    height: '16px',
    '@media (min-width: 744px)': {
      height: '24px',
    },
    '@media (min-width: 1128px)': {
      height: '32px',
    },
  },
});
