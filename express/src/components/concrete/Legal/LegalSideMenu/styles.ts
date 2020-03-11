import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  menuBlock: {
    width: '15%',
    paddingRight: '5px',
    verticalAlign: 'top',
    display: 'none',
    '@media (min-width: 1025px)': {
      display: 'inline-block',
    },
  },
  list: {
    listStyle: 'none',
    lineHeight: '20px',
  },
  listOpt: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    fontSize: '16px',
  },
});
