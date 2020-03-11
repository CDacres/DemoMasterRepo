import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  page: {
    paddingLeft: '12px',
    paddingRight: '12px',
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    ':before': {
      content: '" "',
    },
    ':after': {
      clear: 'both',
      content: '" "',
      display: 'table',
    },
    '@media (min-width: 744px)': {
      paddingLeft: '24px',
      paddingRight: '24px',
      maxWidth: '696px',
    },
    '@media (min-width: 1128px)': {
      maxWidth: '1080px',
    },
  },
  overbox: {
    paddingLeft: '24px',
    paddingRight: '24px',
    maxWidth: 'none',
    '@media (min-width: 1128px)': {
      margin: '0px auto',
      position: 'relative',
      paddingLeft: '80px',
      paddingRight: '80px',
    },
  },
});
