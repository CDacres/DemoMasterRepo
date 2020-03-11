import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  largeImageWrapper: {
    flex: '0 0 auto',
  },
  optionWidth5: {
    '@media (min-width: 1440px)': {
      width: '20%',
    },
    '@media (min-width: 1128px) and (max-width: 1439px)': {
      width: '25%',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      width: '25%',
    },
  },
  optionWidth7: {
    '@media (min-width: 1440px)': {
      width: '14.2857%',
    },
    '@media (min-width: 1128px) and (max-width: 1439px)': {
      width: '16.6667%',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      width: '20%',
    },
  },
  optionWidth8: {
    '@media (min-width: 1440px)': {
      width: '12.5%',
    },
    '@media (min-width: 1128px) and (max-width: 1439px)': {
      width: '16.6667%',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      width: '20%',
    },
  },
});
