import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  collapsable: {
    fontSize: '16px',
    display: 'block',
    ':hover': {
      color: '#00c6ff',
      textDecoration: 'underline',
    },
  },
  collapse: {
    height: 'auto',
    overflow: 'visible',
  },
});
