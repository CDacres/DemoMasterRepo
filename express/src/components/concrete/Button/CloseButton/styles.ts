import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  button: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'buttontext',
    border: '0px none',
    display: 'block',
    padding: '0px',
    margin: '0px',
    ':active': {
      backgroundColor: 'transparent',
    },
    ':hover': {
      backgroundColor: 'transparent',
    },
    ':focus': {
      backgroundColor: 'transparent',
      boxShadow: '0px 0px 4px 2px #d8d8d8',
      outline: 'currentColor',
      padding: '8px',
      margin: '-8px',
      borderRadius: '100%',
    },
  },
});
