import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  title: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  collapsable: {
    color: '#484848',
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  collapseBox: {
    paddingBottom: '20px',
  },
});
