import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  optionWidth3: {
    '@media (min-width: 1128px)': {
      width: '33.3333%',
    },
    '@media (min-width: 744px) and (max-width: 1127px)': {
      width: '50%',
    },
  },
  optionWidth5: {
    '@media (min-width: 1660px)': {
      width: '20%',
    },
    '@media (max-width: 1659px) and (min-width: 1360px)': {
      width: '25%',
    },
    '@media (max-width: 1359px) and (min-width: 1060px)': {
      width: '33.3333%',
    },
    '@media (max-width: 1059px) and (min-width: 760px)': {
      width: '50%',
    },
    '@media (max-width: 759px)': {
      width: '66.6667%',
    },
  },
});
