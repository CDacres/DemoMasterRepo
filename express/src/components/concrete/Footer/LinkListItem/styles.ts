import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  linkListItemAnchor: {
    font: 'inherit',
    textDecoration: 'none',
    color: '#767676',
    cursor: 'pointer',
    ':hover': {
      color: '#767676',
      textDecoration: 'underline',
    },
    ':focus': {
      color: '#767676',
      textDecoration: 'underline',
    },
    ':active': {
      color: '#00c6ff',
    },
  },
});
