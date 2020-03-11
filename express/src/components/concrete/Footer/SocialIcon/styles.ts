import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  socialIconAnchor: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    color: '#767676',
    border: '0px none',
    display: 'block',
    padding: '0px',
    margin: '0px',
    ':active': {
      outline: '0px',
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'default',
      color: 'graytext',
    },
  },
});
