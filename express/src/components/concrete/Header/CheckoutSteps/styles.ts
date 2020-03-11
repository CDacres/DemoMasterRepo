import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  navContainer: {
    display: 'inherit',
  },
  itemNotSelected: {
    color: '#767676',
  },
  stepButton: {
    minWidth: '1px',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    appearance: 'none',
    border: '0px none',
    userSelect: 'auto',
    textAlign: 'left',
    color: '#484848',
    ':hover': {
      textDecoration: 'underline',
      color: '#484848',
    },
  },
});
